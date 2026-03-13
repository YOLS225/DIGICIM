# Big-CIM — Spécification Backend

Ce document décrit l'ensemble des endpoints, modèles de données et comportements attendus que le backend doit implémenter pour alimenter l'application mobile Big-CIM.

---

## Table des matières

- [Ce que le frontend attend — par écran](#ce-que-le-frontend-attend--par-écran)
- [Stack recommandée](#stack-recommandée)
- [Authentification](#1-authentification)
- [Utilisateur](#2-utilisateur)
- [Solde & Transactions](#3-solde--transactions)
- [Rechargement](#4-rechargement)
- [Produits & Catalogue](#5-produits--catalogue)
- [Cimenteries (Sites)](#6-cimenteries-sites)
- [Commandes](#7-commandes)
- [Panier](#8-panier)
- [Messagerie (Support)](#9-messagerie-support)
- [Notifications](#10-notifications)
- [Offres & Promotions](#11-offres--promotions)
- [Codes d'erreur](#codes-derreur-standard)
- [Modèles de données complets](#modèles-de-données-complets)

---

## Ce que le frontend attend — par écran

> Cette section liste, écran par écran, **exactement ce que l'application mobile attend du backend** : les appels API effectués, les données affichées, les états UI déclenchés par les réponses, et les comportements temps réel nécessaires.
>
> Tout ce qui est marqué `[MOCK]` est actuellement simulé en dur dans le code frontend et devra être remplacé par un vrai appel API.

---

### FLOW 1 — Authentification

#### Écran : FirstScreen (Accueil)
Aucun appel API. Écran statique.
- **À faire au démarrage de l'app** : vérifier si un `accessToken` valide existe en storage local → si oui, naviguer directement vers `Pin` (re-vérification PIN) en sautant FirstScreen.

---

#### Écran : Register (Inscription)
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Soumission du formulaire | `POST /auth/register` | Sur appui "Continuer" |

**Données envoyées :**
```json
{ "firstName", "lastName", "phoneNumber", "email", "password" }
```

**États UI pilotés par la réponse :**
- `loading` → spinner sur le bouton pendant l'appel
- `success` → navigation vers l'écran Verify + toast "Code envoyé"
- `error PHONE_EXISTS` → message d'erreur sous le champ téléphone
- `error EMAIL_EXISTS` → message d'erreur sous le champ email
- `error VALIDATION_ERROR` → afficher les erreurs champ par champ

**Données à stocker localement après succès :**
- `pendingPhoneNumber` → pour pré-remplir l'écran OTP

---

#### Écran : PhonenumberVerify (Vérification OTP)
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Valider le code | `POST /auth/verify-otp` | Sur appui "Valider le code" |
| Renvoyer le code | `POST /auth/resend-otp` | Sur appui "Renvoyer" |

**États UI :**
- Champ OTP bloqué / débloqué selon `inactive={code.length < 6}`
- Compte à rebours de 30s avant d'afficher "Renvoyer" (actuellement statique `[MOCK]`)
- `error INVALID_OTP` → secouer les champs + message "Code incorrect"
- `error OTP_EXPIRED` → message "Code expiré, veuillez en demander un nouveau"
- `success` → stocker `accessToken` + `refreshToken` + `user` → naviguer vers PinSetup

**Données à stocker après succès :**
```
AsyncStorage: { accessToken, refreshToken, user }
```

---

#### Écran : Login (Connexion)
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Connexion | `POST /auth/login` | Sur appui "Se connecter" |

**États UI :**
- `error INVALID_CREDENTIALS` → "Identifiants incorrects"
- `error ACCOUNT_LOCKED` → "Compte bloqué, réessayez dans X minutes" + afficher le timer
- `error ACCOUNT_SUSPENDED` → "Compte suspendu, contactez le support"
- `success` → stocker tokens → naviguer vers Pin

---

#### Écran : PinSetup (Création du code PIN)
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Enregistrer le PIN | `POST /auth/set-pin` | Après confirmation des 2 saisies identiques |

**États UI :**
- Étape 1 (créer) → étape 2 (confirmer) : géré en local
- Si les 2 PIN ne correspondent pas → reset + message d'erreur
- `success` → naviguer vers Main

---

#### Écran : CodePin (Vérification PIN au login)
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Vérifier le PIN | `POST /auth/verify-pin` | Automatique dès 4 chiffres saisis |

**États UI :**
- `error INVALID_PIN` → effacer les dots + flash "Code incorrect" + incrémenter compteur
- `error PIN_LOCKED` → afficher "Trop de tentatives, réessayez dans 30 minutes" + désactiver le clavier
- `success` → naviguer vers Main
- Afficher : `"Bienvenue, {user.firstName}"` — données issues du storage local (pas d'appel API)

---

### FLOW 2 — Dashboard & Solde

#### Écran : Home
**Appels attendus au montage :**

| Donnée | Endpoint | Cache |
|---|---|---|
| Solde + stats mensuelles | `GET /wallet/balance` | 30s |
| 3 dernières transactions | `GET /wallet/transactions?limit=3` | 30s |
| Nombre de notifs non lues | `GET /notifications?read=false&limit=1` | 60s |

**Données affichées `[MOCK]` → à remplacer :**
- Solde : `"1 250 000"` → valeur réelle de `/wallet/balance`
- Stats mois : `"+150 000"` / `"-87 500"` → champs `monthlyIn` / `monthlyOut`
- Nom utilisateur dans le header → depuis le storage local (pas d'appel)

**Comportement attendu :**
- Pull-to-refresh pour recharger le solde et les transactions
- Pastille rouge sur la cloche si `unreadCount > 0`

---

#### Écran : TransactionHistory (Historique)
**Appels attendus :**

| Action | Endpoint |
|---|---|
| Chargement initial | `GET /wallet/transactions?page=1&limit=20` |
| Filtrer par type | `GET /wallet/transactions?type=credit&page=1` |
| Filtrer par statut | `GET /wallet/transactions?status=failed` |
| Recherche | `GET /wallet/transactions?search=MTN&page=1` |
| Pagination | `GET /wallet/transactions?page=2` |

**Données affichées `[MOCK]` → à remplacer :**
- Toute la liste `ALL_TRANSACTIONS` (8 entrées fixes)
- Les totaux `totalIn` / `totalOut` → calculés côté backend (champs `meta.totalIn`, `meta.totalOut`)

**États UI :**
- Skeleton loader pendant le chargement initial
- Message "Aucune transaction" si liste vide
- Infinite scroll ou bouton "Charger plus"

---

### FLOW 3 — Rechargement

#### Écran : Rechargement
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Initier le rechargement | `POST /wallet/recharge` | Sur validation dialog |
| Vérifier le statut | `GET /wallet/recharge/:txnId/status` | Polling toutes les 3s pendant 30s max |

**Données envoyées :**
```json
{ "amount": 50000, "phoneNumber": "+2250700000000", "provider": "MTN_MOMO" }
```

**Comportement attendu `[MOCK]` → à remplacer :**
- Actuellement : `Math.random() < 0.5` pour simuler succès/échec
- Réel : initier la transaction → attendre le webhook → polling du statut
- Afficher l'USSD code retourné par le backend : `"*144*1*50000#"`
- Afficher un timer de 5 minutes pendant lequel l'utilisateur doit valider sur son téléphone
- `success` → créditer visuellement le solde + toast + navigation vers Main
- `failed` → toast d'erreur + rester sur l'écran (ne pas naviguer)

**Sélecteur de provider :**
- L'écran doit proposer le choix du prestataire (MTN, Orange, Wave, Moov) → **non implémenté encore**
- Backend doit retourner les providers disponibles : `GET /wallet/providers`

---

### FLOW 4 — Achat de ciment

#### Écran : ChooseFactory (Choix cimenterie)
**Appels attendus :**

| Action | Endpoint |
|---|---|
| Chargement des sites | `GET /sites?available=true` |
| Recherche | `GET /sites?search=Angré` |

**Données affichées `[MOCK]` → à remplacer :**
- Les 3 cimenteries (Angré, Yamoussoukro, Bouaké) avec leurs statuts
- La distance `"12 km"` → calculée par le backend avec les coordonnées GPS du device
- Le nombre de produits `"8 produits"` → champ `productCount` dans la réponse

**À envoyer au backend :**
- Coordonnées GPS du device (permission à demander) pour le calcul de distance

---

#### Écran : ChooseCement (Catalogue produits)
**Appels attendus :**

| Action | Endpoint |
|---|---|
| Chargement du catalogue | `GET /sites/:siteId/products` |
| Filtrer par catégorie | `GET /sites/:siteId/products?category=cement` |
| Recherche | `GET /sites/:siteId/products?search=CPJ` |

**Données affichées `[MOCK]` → à remplacer :**
- Les 6 produits hardcodés (`CPJ 42,5`, `CEM II`, `CPA 55`, etc.)
- Les prix → depuis `product.priceTTC`
- Le stock → `product.available` (afficher "Rupture de stock" si `false`)

**États UI :**
- Si `product.available = false` → griser la card + bouton "Indisponible"
- Badge de stock faible si `product.stock < 10`

---

#### Écran : Cart (Panier)
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Valider le panier | `POST /cart/validate` | Au chargement du panier |
| Passer la commande | `POST /orders` | Sur "Passer la commande" |

**Données envoyées pour la commande :**
```json
{
  "siteId": "uuid-du-site-sélectionné",
  "items": [{ "productId": "uuid", "quantity": 2 }],
  "deliveryAddress": "Cocody, Angré"
}
```

**Vérifications côté backend attendues :**
- Solde suffisant → `error INSUFFICIENT_BALANCE` → toast "Solde insuffisant, rechargez votre compte"
- Stock suffisant → `error STOCK_INSUFFICIENT` → toast "Stock insuffisant pour X produit"

**Comportement attendu `[MOCK]` → à remplacer :**
- Le timer de 2 secondes simulé → remplacer par l'appel réel `POST /orders`
- Naviguer vers `OrderConfirmation` avec les données réelles retournées par le backend

---

#### Écran : OrderConfirmation (Confirmation)
- Toutes les données affichées viennent du `params` passés depuis Cart → issues de la réponse `POST /orders`
- **Aucun appel API supplémentaire** sur cet écran

---

#### Écran : OrderDetail (Détail commande)
**Appels attendus :**

| Action | Endpoint |
|---|---|
| Charger le détail | `GET /orders/:orderId` |
| Annuler | `PATCH /orders/:orderId/cancel` |
| Télécharger facture | `GET /orders/:orderId/invoice` |

**Données affichées `[MOCK]` → à remplacer :**
- Les 5 étapes de la timeline → issues du tableau `order.tracking` retourné par le backend
- La date de chaque étape → champ `tracking[].date` (null = étape non atteinte)
- Le statut en temps réel → polling `GET /orders/:orderId` toutes les 30s si statut non terminal

**États UI selon statut :**
- `pending` / `confirmed` → bouton "Annuler" visible
- `processing` / `shipped` → bouton "Annuler" masqué
- `delivered` → bouton "Télécharger la facture" activé
- `cancelled` → banner rouge "Commande annulée"

---

#### Écran : Orders (Liste des commandes)
**Appels attendus :**

| Action | Endpoint |
|---|---|
| Chargement | `GET /orders?page=1&limit=10` |
| Filtrer | `GET /orders?status=delivered` |
| Pagination | `GET /orders?page=2` |

**Données affichées `[MOCK]` → à remplacer :**
- Les 4 commandes hardcodées avec leurs statuts
- Les statistiques en haut (total, en cours, livrés) → champs `meta.stats` de la réponse

---

### FLOW 5 — Messagerie Support

#### Écran : ContactUs (Liste messages)
**Appels attendus au montage :**

| Action | Endpoint |
|---|---|
| Charger les tickets | `GET /support/tickets?page=1` |
| Marquer un ticket comme lu | `PATCH /support/tickets/:ticketId/read` sur tap |

**Données affichées `[MOCK]` → à remplacer :**
- Les 3 conversations hardcodées
- Le badge "non lu" → champ `ticket.unreadCount > 0`
- Le statut (Répondu / En attente) → champ `ticket.status`
- L'aperçu du dernier message → `ticket.lastMessage.content`

---

#### Écran : ChooseMessage (Nouveau message)
Aucun appel API. Navigation pure.

---

#### Écran : SendMessage (Rédiger un message)
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Envoyer | `POST /support/tickets` | Sur "Envoyer le message" |

**Données envoyées :**
```json
{
  "type": "ACHAT",
  "subject": "Livraison",
  "message": "Bonjour, ma commande...",
  "orderId": null
}
```

**Comportement attendu `[MOCK]` → à remplacer :**
- Le `setTimeout(1500)` → remplacer par l'appel réel
- `success` → naviguer vers `MessageDetail` avec le ticket créé
- `error` → toast + rester sur l'écran

---

#### Écran : MessageDetail (Conversation)
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Charger les messages | `GET /support/tickets/:ticketId/messages` | Au montage |
| Envoyer un message | `POST /support/tickets/:ticketId/messages` | Sur appui envoi |
| Polling nouveaux messages | `GET /support/tickets/:ticketId/messages?after=:lastMessageId` | Toutes les 5s |

**Données affichées `[MOCK]` → à remplacer :**
- Les 4 messages hardcodés `MOCK_MESSAGES`

**Comportement temps réel attendu :**
- Polling toutes les 5s pour les nouvelles réponses de l'agent
- Alternative recommandée : **WebSocket** `ws://api.bigcim.ci/support/:ticketId` pour les messages en temps réel
- Scroll automatique vers le bas à chaque nouveau message
- Indicateur "Agent en train d'écrire..." (`typing indicator`) si WebSocket implémenté

---

### FLOW 6 — Profil

#### Écran : Profil
**Appels attendus au montage :**

| Donnée | Endpoint |
|---|---|
| Données utilisateur | `GET /users/me` |

**Données affichées `[MOCK]` → à remplacer :**
- `userInfo` depuis `all-data_db` → remplacer par la réponse de `/users/me`
- Les statistiques : `"12 commandes"`, `"1,25M FCFA"`, `"3 cimenteries"` → champs `user.stats`

---

#### Écran : EditProfile (Modifier le profil)
**Appels attendus :**

| Action | Endpoint | Timing |
|---|---|---|
| Charger les données | `GET /users/me` | Au montage |
| Sauvegarder | `PATCH /users/me` | Sur "Enregistrer" |
| Changer la photo | `POST /users/me/avatar` | Sur sélection de la photo |

**Comportement attendu `[MOCK]` → à remplacer :**
- Le `setTimeout(1200)` → remplacer par `PATCH /users/me`
- Si email modifié → afficher "Un email de vérification a été envoyé"

---

### FLOW 7 — Notifications

#### Écran : Notifications
**Appels attendus :**

| Action | Endpoint |
|---|---|
| Charger les notifs | `GET /notifications?page=1&limit=20` |
| Marquer une notif lue | `PATCH /notifications/:notifId/read` |
| Tout marquer comme lu | `PATCH /notifications/read-all` |

**Données affichées `[MOCK]` → à remplacer :**
- `INITIAL_NOTIFS` (6 notifs hardcodées)

**Au démarrage de l'app :**
- Enregistrer le token FCM : `POST /notifications/register-device`
- Écouter les notifications push Firebase (foreground + background)

---

### FLOW 8 — Offres

#### Écran : Offers
**Appels attendus :**

| Action | Endpoint |
|---|---|
| Offre vedette | `GET /offers/featured` |
| Liste des offres | `GET /offers?active=true` |
| Filtrer par catégorie | `GET /offers?category=loyalty` |

**Données affichées `[MOCK]` → à remplacer :**
- `FEATURED_OFFER` et `OFFERS` (4 offres hardcodées)
- Le compte à rebours `"5 jours"` → calculé depuis `offer.validUntil`

---

### Synthèse — Ce qui est entièrement mocké et doit être connecté

| Priorité | Écran / Feature | Ce qui est mocké | Endpoint à connecter |
|---|---|---|---|
| 🔴 Critique | Login | Navigation directe sans vérification | `POST /auth/login` |
| 🔴 Critique | Register | Mutation RQ non connectée à une vraie API | `POST /auth/register` |
| 🔴 Critique | OTP Verify | Alerte basique, pas de vrai check | `POST /auth/verify-otp` |
| 🔴 Critique | Code PIN | Comparaison avec le PIN du mock local | `POST /auth/verify-pin` |
| 🔴 Critique | Home — Solde | `"1 250 000"` hardcodé | `GET /wallet/balance` |
| 🔴 Critique | Home — Transactions | 3 transactions fixes | `GET /wallet/transactions?limit=3` |
| 🔴 Critique | Rechargement | `Math.random()` pour succès/échec | `POST /wallet/recharge` + polling |
| 🔴 Critique | Passer commande | `setTimeout(2s)` + navigation | `POST /orders` |
| 🟠 Important | Transaction History | 8 transactions fixes | `GET /wallet/transactions` |
| 🟠 Important | Commandes | 4 commandes fixes | `GET /orders` |
| 🟠 Important | Détail commande | Timeline fixe | `GET /orders/:id` |
| 🟠 Important | Factories | 3 sites hardcodés | `GET /sites` |
| 🟠 Important | Catalogue ciment | 6 produits hardcodés | `GET /sites/:id/products` |
| 🟠 Important | Messagerie | Tickets + messages mockés | `GET /support/tickets` + messages |
| 🟠 Important | Send message | `setTimeout` simulé | `POST /support/tickets` |
| 🟡 Normal | Profil — Stats | `"12 commandes"` etc. hardcodés | `GET /users/me` (champ `stats`) |
| 🟡 Normal | Notifications | 6 notifs hardcodées | `GET /notifications` |
| 🟡 Normal | Offres | 4 offres hardcodées | `GET /offers` |
| 🟡 Normal | Edit Profile | `setTimeout` simulé | `PATCH /users/me` |
| 🟡 Normal | Token persistence | Pas de gestion token | Storage + auto-refresh |

---

### Fonctionnalités transversales attendues

#### Gestion du token JWT
L'app doit implémenter un intercepteur HTTP qui :
- Ajoute `Authorization: Bearer <token>` sur chaque requête
- Sur `401` → tenter un `POST /auth/refresh` avec le refreshToken
- Si le refresh échoue → déconnecter l'utilisateur + naviguer vers FirstScreen
- Stocker les tokens dans `SecureStore` (expo-secure-store) — **pas** AsyncStorage (non chiffré)

#### Stockage sécurisé attendu
```
SecureStore:
  - accessToken
  - refreshToken
  - pinHash (optionnel, pour vérification locale rapide)
AsyncStorage:
  - user (données non sensibles)
  - preferences (thème, notifications)
```

#### Gestion hors-ligne
- Afficher un banner "Pas de connexion internet" si hors-ligne
- Les écrans de consultation (solde, commandes) doivent afficher les **dernières données mises en cache** (React Query)
- Les actions (commander, recharger) doivent être bloquées sans connexion

#### Permissions à demander
- **Notifications push** → au premier lancement (pour FCM)
- **Localisation** → sur l'écran Factories (pour calcul de distance)

---

---

## Stack recommandée

| Composant | Recommandation |
|---|---|
| Runtime | Node.js 20+ / Python (FastAPI) |
| Base de données | PostgreSQL |
| Cache | Redis |
| Auth | JWT (access + refresh tokens) |
| SMS / OTP | Twilio ou Africa's Talking |
| Paiement Mobile Money | FedaPay, CinetPay ou Wave CI |
| Push notifications | Firebase FCM |
| Stockage fichiers | AWS S3 ou Cloudinary |

---

## Convention générale

- **Base URL** : `https://api.bigcim.ci/v1`
- **Auth** : Header `Authorization: Bearer <access_token>` sur toutes les routes protégées
- **Format** : JSON
- **Pagination** : `?page=1&limit=20`
- **Dates** : ISO 8601 (`2026-03-12T10:30:00Z`)

**Format de réponse standard :**
```json
{
  "success": true,
  "data": { ... },
  "message": "Opération réussie",
  "meta": { "page": 1, "total": 42 }
}
```

**Format d'erreur standard :**
```json
{
  "success": false,
  "error": {
    "code": "INVALID_PIN",
    "message": "Le code PIN est incorrect.",
    "details": {}
  }
}
```

---

## 1. Authentification

### 1.1 Inscription
```
POST /auth/register
```
**Body :**
```json
{
  "firstName": "Ibrahim",
  "lastName": "Kpalouazer",
  "phoneNumber": "+2250700000000",
  "email": "ibrahim@example.com",
  "password": "monMotDePasse123"
}
```
**Comportement :**
- Valider que le numéro de téléphone n'est pas déjà utilisé
- Valider que l'email n'est pas déjà utilisé
- Hasher le mot de passe (bcrypt, 12 rounds minimum)
- Créer l'utilisateur avec `status: "pending_verification"`
- Envoyer un OTP à 6 chiffres par SMS (TTL : 10 minutes)
- Créer un compte utilisateur avec solde initial à 0

**Réponse :**
```json
{
  "success": true,
  "data": {
    "userId": "uuid",
    "phoneNumber": "+2250700000000",
    "otpExpiresAt": "2026-03-12T10:40:00Z"
  }
}
```

---

### 1.2 Vérification OTP
```
POST /auth/verify-otp
```
**Body :**
```json
{
  "phoneNumber": "+2250700000000",
  "code": "482731"
}
```
**Comportement :**
- Vérifier le code OTP et son expiration
- Passer l'utilisateur à `status: "active"`
- Invalider l'OTP après usage (usage unique)
- Retourner les tokens d'accès

**Réponse :**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJ...",
    "refreshToken": "eyJ...",
    "expiresIn": 3600,
    "user": { "id": "uuid", "firstName": "Ibrahim", ... }
  }
}
```

---

### 1.3 Renvoi OTP
```
POST /auth/resend-otp
```
**Body :** `{ "phoneNumber": "+2250700000000" }`

**Comportement :**
- Rate limiting : maximum 3 renvois par heure par numéro
- Invalider l'OTP précédent
- Générer et envoyer un nouvel OTP

---

### 1.4 Connexion
```
POST /auth/login
```
**Body :**
```json
{
  "phoneNumber": "+2250700000000",
  "password": "monMotDePasse123"
}
```
**Comportement :**
- Vérifier les identifiants
- Bloquer après 5 tentatives échouées (15 minutes)
- Retourner les tokens si succès

---

### 1.5 Vérification code PIN
```
POST /auth/verify-pin
```
**Body :** `{ "pinCode": "1234" }`

**Comportement :**
- Vérifier le PIN de l'utilisateur connecté (via le token)
- Bloquer après 3 tentatives échouées (30 minutes)
- Le PIN est requis pour accéder au dashboard après connexion

---

### 1.6 Création / Modification PIN
```
POST /auth/set-pin
```
**Body :** `{ "pinCode": "1234" }`

**Comportement :**
- Setter ou mettre à jour le code PIN
- Hasher le PIN avant stockage

---

### 1.7 Mot de passe oublié
```
POST /auth/forgot-password
```
**Body :** `{ "phoneNumber": "+2250700000000" }`

Envoie un OTP pour réinitialiser le mot de passe.

```
POST /auth/reset-password
```
**Body :** `{ "phoneNumber": "...", "code": "...", "newPassword": "..." }`

---

### 1.8 Refresh token
```
POST /auth/refresh
```
**Body :** `{ "refreshToken": "eyJ..." }`

---

### 1.9 Déconnexion
```
POST /auth/logout
```
Invalider le refresh token en cours.

---

## 2. Utilisateur

### 2.1 Profil courant
```
GET /users/me
```
**Réponse :**
```json
{
  "id": "uuid",
  "firstName": "Ibrahim",
  "lastName": "Kpalouazer",
  "email": "ibrahim@example.com",
  "phoneNumber": "+2250700000000",
  "avatar": "https://cdn.bigcim.ci/avatars/uuid.jpg",
  "status": "active",
  "balance": 1250000,
  "pinSet": true,
  "emailVerified": false,
  "phoneVerified": true,
  "createdAt": "2026-01-10T08:00:00Z",
  "stats": {
    "totalOrders": 12,
    "totalSpent": 1250000,
    "totalSites": 2
  }
}
```

---

### 2.2 Modifier le profil
```
PATCH /users/me
```
**Body (champs modifiables) :**
```json
{
  "firstName": "Ibrahim",
  "lastName": "Kpalouazer",
  "email": "newemail@example.com"
}
```
- Le `phoneNumber` ne peut pas être modifié ici (flow séparé avec OTP)
- Si l'email change, envoyer un email de vérification

---

### 2.3 Changer le mot de passe
```
POST /users/me/change-password
```
**Body :**
```json
{
  "currentPassword": "ancienMdp",
  "newPassword": "nouveauMdp123"
}
```

---

### 2.4 Upload avatar
```
POST /users/me/avatar
```
**Content-Type :** `multipart/form-data`
**Body :** `file` (image, max 5 MB, formats : jpg/png/webp)

---

## 3. Solde & Transactions

### 3.1 Consulter le solde
```
GET /wallet/balance
```
**Réponse :**
```json
{
  "balance": 1250000,
  "currency": "FCFA",
  "updatedAt": "2026-03-12T10:15:00Z",
  "monthlyIn": 150000,
  "monthlyOut": 87500
}
```

---

### 3.2 Historique des transactions
```
GET /wallet/transactions?page=1&limit=20&type=all&startDate=2026-01-01&endDate=2026-03-31
```
**Query params :**
- `type` : `all | credit | debit`
- `startDate`, `endDate` : filtre par date
- `status` : `success | failed | pending`

**Réponse :**
```json
{
  "data": [
    {
      "id": "txn-uuid",
      "label": "Rechargement MTN",
      "amount": 50000,
      "type": "credit",
      "status": "success",
      "reference": "TXN-2026-0012",
      "date": "2026-03-12T10:30:00Z",
      "metadata": {
        "provider": "MTN Mobile Money",
        "phoneNumber": "+2250700000000"
      }
    }
  ],
  "meta": { "page": 1, "total": 42, "totalPages": 3 }
}
```

---

## 4. Rechargement

### 4.1 Initier un rechargement
```
POST /wallet/recharge
```
**Body :**
```json
{
  "amount": 50000,
  "phoneNumber": "+2250700000000",
  "provider": "MTN_MOMO"
}
```
**Providers disponibles :** `MTN_MOMO | ORANGE_MONEY | WAVE | MOOV_MONEY`

**Comportement :**
- Valider le montant (min : 500 FCFA, max : 5 000 000 FCFA)
- Initier la transaction via le prestataire de paiement (CinetPay / FedaPay)
- Créer une transaction en statut `pending`
- Retourner un `transactionId` et un `paymentUrl` ou `ussdCode`

**Réponse :**
```json
{
  "transactionId": "txn-uuid",
  "status": "pending",
  "ussdCode": "*144*1*50000#",
  "expiresAt": "2026-03-12T10:45:00Z"
}
```

---

### 4.2 Vérifier le statut d'un rechargement
```
GET /wallet/recharge/:transactionId/status
```
**Comportement :**
- Interroger le prestataire pour le statut en temps réel
- Mettre à jour le solde si `success`
- Envoyer une notification push à l'utilisateur

---

### 4.3 Webhook de confirmation paiement
```
POST /webhooks/payment
```
Endpoint appelé par le prestataire de paiement pour confirmer la transaction. Doit être sécurisé par signature HMAC.

---

## 5. Produits & Catalogue

### 5.1 Liste des produits
```
GET /products?siteId=uuid&category=cement&search=CPJ
```
**Query params :**
- `siteId` : filtrer par cimenterie (optionnel)
- `category` : `cement | beton | mortier`
- `search` : recherche textuelle

**Réponse :**
```json
{
  "data": [
    {
      "id": "prod-uuid",
      "name": "CPJ 42,5 (N)",
      "description": "Ciment Portland composé 42,5 N",
      "category": "cement",
      "unit": "T",
      "pricePerUnit": 85000,
      "currency": "FCFA",
      "taxRate": 0.18,
      "priceTTC": 100300,
      "imageUrl": "https://cdn.bigcim.ci/products/cpj425.jpg",
      "stock": 500,
      "available": true,
      "availableAtSites": ["site-uuid-1", "site-uuid-2"]
    }
  ]
}
```

---

### 5.2 Détail d'un produit
```
GET /products/:productId
```

---

## 6. Cimenteries (Sites)

### 6.1 Liste des cimenteries
```
GET /sites?available=true&lat=5.359&lon=-4.008
```
**Query params :**
- `available` : filtrer sur les sites actifs
- `lat`, `lon` : pour calculer et trier par distance

**Réponse :**
```json
{
  "data": [
    {
      "id": "site-uuid",
      "name": "Usine Angré",
      "city": "Abidjan",
      "district": "Cocody",
      "address": "Angré 8ème tranche, Abidjan",
      "coordinates": { "lat": 5.359, "lon": -4.008 },
      "phone": "+22527220000",
      "openingHours": "Lun-Sam 08h00-18h00",
      "available": true,
      "distance": 12.3,
      "productCount": 8,
      "imageUrl": "https://cdn.bigcim.ci/sites/angre.jpg"
    }
  ]
}
```

---

### 6.2 Détail d'un site
```
GET /sites/:siteId
```

### 6.3 Produits disponibles sur un site
```
GET /sites/:siteId/products
```

---

## 7. Commandes

### 7.1 Créer une commande
```
POST /orders
```
**Body :**
```json
{
  "siteId": "site-uuid",
  "items": [
    { "productId": "prod-uuid", "quantity": 5 }
  ],
  "deliveryAddress": "Cocody, Angré - Abidjan",
  "notes": "Livraison avant 14h"
}
```
**Comportement :**
- Vérifier la disponibilité des stocks
- Calculer le total (HT + TVA + livraison)
- Vérifier que le solde est suffisant
- Débiter le solde du compte utilisateur
- Créer la commande avec statut `pending`
- Créer une transaction de débit
- Envoyer une notification push de confirmation
- Envoyer un SMS de confirmation

**Réponse :**
```json
{
  "orderId": "CMD-2026-0046",
  "status": "pending",
  "totalAmount": 425000,
  "estimatedDelivery": "2026-03-14",
  "createdAt": "2026-03-12T10:30:00Z"
}
```

---

### 7.2 Liste des commandes de l'utilisateur
```
GET /orders?status=all&page=1&limit=10
```
**Status filtrables :** `pending | confirmed | processing | shipped | delivered | cancelled`

---

### 7.3 Détail d'une commande
```
GET /orders/:orderId
```
**Réponse :**
```json
{
  "id": "CMD-2026-0046",
  "status": "shipped",
  "site": { "id": "...", "name": "Usine Angré" },
  "items": [
    {
      "product": { "id": "...", "name": "CPJ 42,5 (N)", "unit": "T" },
      "quantity": 5,
      "unitPrice": 85000,
      "total": 425000
    }
  ],
  "pricing": {
    "subtotal": 425000,
    "delivery": 5000,
    "tax": 0,
    "total": 430000
  },
  "tracking": [
    { "status": "pending",    "label": "Commande passée",   "date": "2026-03-12T09:15:00Z" },
    { "status": "confirmed",  "label": "Validée",            "date": "2026-03-12T09:30:00Z" },
    { "status": "processing", "label": "En préparation",     "date": "2026-03-12T11:00:00Z" },
    { "status": "shipped",    "label": "Expédiée",           "date": null },
    { "status": "delivered",  "label": "Livrée",             "date": null }
  ],
  "deliveryAddress": "Cocody, Angré - Abidjan",
  "estimatedDelivery": "2026-03-14",
  "createdAt": "2026-03-12T09:15:00Z"
}
```

---

### 7.4 Annuler une commande
```
PATCH /orders/:orderId/cancel
```
**Comportement :**
- Annulation possible uniquement si statut `pending` ou `confirmed`
- Rembourser le montant sur le solde de l'utilisateur
- Envoyer une notification

---

### 7.5 Télécharger la facture
```
GET /orders/:orderId/invoice
```
**Réponse :** Fichier PDF

---

## 8. Panier

> Le panier est géré côté frontend en état local. Il n'y a **pas** besoin d'API panier persistée, sauf si vous souhaitez une récupération cross-device.

### 8.1 Valider le panier (optionnel)
```
POST /cart/validate
```
**Body :** Liste des items avec productId et quantities

**Comportement :**
- Vérifier les stocks en temps réel
- Retourner les prix à jour
- Signaler les ruptures de stock

---

## 9. Messagerie (Support)

### 9.1 Créer un nouveau ticket
```
POST /support/tickets
```
**Body :**
```json
{
  "type": "ACHAT",
  "subject": "Livraison",
  "message": "Bonjour, ma commande n'a pas encore été livrée...",
  "orderId": "CMD-2026-0046"
}
```
**Types :** `ACHAT | RECHARGEMENT | QUESTION`

**Comportement :**
- Créer un ticket avec statut `open`
- Assigner à un agent support disponible
- Notifier l'équipe support
- Envoyer une confirmation à l'utilisateur

---

### 9.2 Liste des tickets de l'utilisateur
```
GET /support/tickets?status=open&page=1
```
**Réponse :**
```json
{
  "data": [
    {
      "id": "ticket-uuid",
      "type": "RECHARGEMENT",
      "subject": "Rechargement non reçu",
      "status": "open",
      "unreadCount": 1,
      "lastMessage": {
        "content": "Nous vérifions votre dossier...",
        "from": "agent",
        "date": "2026-03-12T14:35:00Z"
      },
      "createdAt": "2026-03-11T14:05:00Z"
    }
  ]
}
```

---

### 9.3 Messages d'un ticket
```
GET /support/tickets/:ticketId/messages
```
**Réponse :**
```json
{
  "ticket": { "id": "...", "subject": "...", "status": "open" },
  "messages": [
    {
      "id": "msg-uuid",
      "from": "user",
      "content": "Bonjour, j'ai effectué un rechargement...",
      "date": "2026-03-11T14:05:00Z"
    },
    {
      "id": "msg-uuid-2",
      "from": "agent",
      "agentName": "Support Big-CIM",
      "content": "Bonjour, nous avons bien reçu votre demande...",
      "date": "2026-03-11T14:22:00Z"
    }
  ]
}
```

---

### 9.4 Envoyer un message dans un ticket
```
POST /support/tickets/:ticketId/messages
```
**Body :** `{ "content": "Mon message..." }`

**Comportement :**
- Ajouter le message au ticket
- Notifier l'agent support via webhook/email
- Rouvrir le ticket si statut `resolved`

---

### 9.5 Fermer un ticket
```
PATCH /support/tickets/:ticketId/close
```

---

## 10. Notifications

### 10.1 Liste des notifications
```
GET /notifications?read=false&page=1&limit=20
```
**Réponse :**
```json
{
  "data": [
    {
      "id": "notif-uuid",
      "type": "order",
      "title": "Commande expédiée",
      "body": "Votre commande CMD-2026-0038 a été expédiée.",
      "data": { "orderId": "CMD-2026-0038" },
      "read": false,
      "createdAt": "2026-03-12T08:00:00Z"
    }
  ],
  "unreadCount": 2
}
```

**Types de notifications :** `order | payment | promo | system | support`

---

### 10.2 Marquer comme lu
```
PATCH /notifications/:notifId/read
```

### 10.3 Tout marquer comme lu
```
PATCH /notifications/read-all
```

### 10.4 Enregistrer le token FCM
```
POST /notifications/register-device
```
**Body :**
```json
{
  "fcmToken": "firebase-token-here",
  "platform": "ios",
  "deviceId": "uuid"
}
```

---

## 11. Offres & Promotions

### 11.1 Liste des offres actives
```
GET /offers?category=all&active=true
```
**Réponse :**
```json
{
  "data": [
    {
      "id": "offer-uuid",
      "title": "Remise fidélité 10%",
      "description": "Pour tout achat supérieur à 500 000 FCFA",
      "type": "percentage",
      "discount": 10,
      "category": "loyalty",
      "minAmount": 500000,
      "validFrom": "2026-03-01T00:00:00Z",
      "validUntil": "2026-03-31T23:59:59Z",
      "active": true,
      "featured": false
    }
  ]
}
```

### 11.2 Offre en vedette
```
GET /offers/featured
```
Retourne l'offre mise en avant sur la page Offres.

### 11.3 Appliquer un code promo
```
POST /orders/apply-promo
```
**Body :** `{ "code": "PROMO2026", "cartTotal": 500000 }`

---

## Codes d'erreur standard

| Code | Description |
|---|---|
| `UNAUTHORIZED` | Token absent ou invalide |
| `FORBIDDEN` | Action non permise |
| `USER_NOT_FOUND` | Utilisateur introuvable |
| `INVALID_CREDENTIALS` | Mauvais identifiants |
| `INVALID_OTP` | Code OTP incorrect |
| `OTP_EXPIRED` | Code OTP expiré |
| `INVALID_PIN` | Code PIN incorrect |
| `PIN_LOCKED` | Compte temporairement bloqué (trop de tentatives) |
| `INSUFFICIENT_BALANCE` | Solde insuffisant |
| `PRODUCT_UNAVAILABLE` | Produit indisponible |
| `STOCK_INSUFFICIENT` | Stock insuffisant |
| `ORDER_NOT_CANCELLABLE` | La commande ne peut plus être annulée |
| `PAYMENT_FAILED` | Échec de la transaction Mobile Money |
| `RATE_LIMIT_EXCEEDED` | Trop de requêtes |
| `VALIDATION_ERROR` | Données invalides (détails dans `details`) |

---

## Modèles de données complets

### User
```typescript
{
  id: UUID
  firstName: string
  lastName: string
  email: string
  emailVerified: boolean
  phoneNumber: string           // format E.164 : +2250700000000
  phoneVerified: boolean
  passwordHash: string
  pinHash: string | null
  avatar: string | null         // URL
  balance: number               // en FCFA (entier)
  status: 'pending_verification' | 'active' | 'suspended' | 'banned'
  fcmTokens: string[]
  loginAttempts: number
  lockedUntil: Date | null
  pinAttempts: number
  pinLockedUntil: Date | null
  createdAt: Date
  updatedAt: Date
}
```

### Transaction
```typescript
{
  id: UUID
  reference: string             // TXN-2026-XXXX
  userId: UUID
  amount: number                // positif = crédit, négatif = débit
  type: 'credit' | 'debit'
  status: 'pending' | 'success' | 'failed'
  label: string
  provider: string | null       // MTN_MOMO, ORANGE_MONEY, etc.
  providerReference: string | null
  orderId: UUID | null
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
}
```

### Order
```typescript
{
  id: string                    // CMD-2026-XXXX
  userId: UUID
  siteId: UUID
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  items: OrderItem[]
  subtotal: number
  deliveryFee: number
  tax: number
  total: number
  deliveryAddress: string
  estimatedDelivery: Date | null
  notes: string | null
  cancelReason: string | null
  transactionId: UUID
  createdAt: Date
  updatedAt: Date
}

{
  // OrderItem
  id: UUID
  orderId: string
  productId: UUID
  quantity: number
  unitPrice: number
  total: number
}
```

### Product
```typescript
{
  id: UUID
  name: string
  description: string
  category: 'cement' | 'beton' | 'mortier'
  unit: string                  // T, M3, etc.
  priceHT: number
  taxRate: number               // 0.18 pour 18%
  priceTTC: number
  imageUrl: string
  stock: number
  available: boolean
  createdAt: Date
  updatedAt: Date
}
```

### SupportTicket
```typescript
{
  id: UUID
  userId: UUID
  agentId: UUID | null
  type: 'ACHAT' | 'RECHARGEMENT' | 'QUESTION'
  subject: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  orderId: UUID | null
  createdAt: Date
  updatedAt: Date
  closedAt: Date | null
}

{
  // TicketMessage
  id: UUID
  ticketId: UUID
  from: 'user' | 'agent'
  senderId: UUID
  content: string
  readAt: Date | null
  createdAt: Date
}
```

---

## Règles métier importantes

### Solde
- Le solde ne peut jamais être négatif
- Toute opération de débit doit vérifier le solde **avant** de débiter
- Le débit pour une commande doit être atomique avec la création de la commande (transaction DB)

### Rechargement Mobile Money
- L'argent n'est crédité que **après confirmation webhook** du prestataire
- Implémenter une idempotency key pour éviter les doubles crédits
- Délai max de confirmation : 30 minutes, après quoi la transaction est marquée `failed`

### Commandes
- Le stock est réservé au moment de la commande (pas au moment de l'ajout au panier)
- Si la commande est annulée, le stock est remis à disposition et le solde remboursé
- Une commande `delivered` ne peut plus être annulée

### Sécurité
- Tous les tokens JWT ont une expiration de **1 heure** (access) et **30 jours** (refresh)
- Le refresh token est invalidé à la déconnexion
- Le PIN est haché avec bcrypt (jamais stocké en clair)
- Rate limiting sur tous les endpoints sensibles (auth, OTP, PIN)
- Les webhooks de paiement doivent être vérifiés par signature HMAC

### Notifications push
Déclencher une notification pour :
- Rechargement crédité / échoué
- Commande confirmée / expédiée / livrée / annulée
- Réponse d'un agent support
- Nouvelle offre promotionnelle
