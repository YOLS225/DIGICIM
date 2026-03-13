// src/services/authService.ts


import { v4 as uuidv4 } from 'uuid';
import {OTP, RegisterForm, User} from "@/components/objects/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Simulation BDD — utilisateur démo pré-chargé
let users: User[] = [
  {
    id: '1',
    firstName: 'digilab',
    lastName: 'Digilab',
    email: 'digilab@mydigilab.io',
    phoneNumber: '0700757873',
    password: 'digilab',
    pinCode: '1234',
    balance: 15000000,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
];
let otps: OTP[] = [];

// Charge les données au démarrage
(async () => {
    const savedUsers = await AsyncStorage.getItem('users');
    if (savedUsers) users = JSON.parse(savedUsers);
})();

export const authService = {
    async createUser(form:RegisterForm): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(async () => {
                // Vérifie si le numéro existe déjà
                if (users.some(u => u.phoneNumber === form.phoneNumber)) {
                    reject(new Error('Ce numéro est déjà enregistré'));
                    return;
                }

                const newUser: User = {
                    id: uuidv4(),
                    firstName: form.firstName,
                    lastName: form.lastName,
                    phoneNumber: form.phoneNumber,
                    email: form.email,
                    password: form.password,
                    createdAt: new Date().toISOString()
                };

                users.push(newUser);
                await AsyncStorage.setItem('users', JSON.stringify(users));
                resolve(newUser);
            }, 800); // Simule latence réseau
        });
    },

    async login(phoneNumber: string, password: string): Promise<User> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = users.find(u =>
                    u.phoneNumber === phoneNumber &&
                    u.password === password // Comparaison directe seulement en simulation
                );

                if (!user) {
                    reject(new Error('Numéro ou mot de passe incorrect'));
                    return;
                }
                resolve(user);
            }, 1000);
        });
    },

    async sendOTP(phoneNumber: string): Promise<{ success: boolean }> {
        return new Promise(resolve => {
            setTimeout(() => {
                // Génère un code à 6 chiffres
                const code = Math.floor(100000 + Math.random() * 900000).toString();

                // Supprime les anciens OTP pour ce numéro
                otps = otps.filter(o => o.phoneNumber !== phoneNumber);

                // Ajoute le nouveau OTP (valide 10 min)
                otps.push({
                    phoneNumber,
                    code,
                    expiresAt: Date.now() + 600000 // 10 minutes
                });

                console.log(`[DEV] OTP pour ${phoneNumber}: ${code}`);
                resolve({ success: true });
            }, 800); // Simule délai réseau
        });
    },

    async verifyOTP(phoneNumber: string, code: string): Promise<{ success: boolean }> {
        return new Promise(resolve => {
            setTimeout(() => {
                const otp = otps.find(o => o.phoneNumber === phoneNumber);

                const isValid = !!otp &&
                    otp.code === code &&
                    Date.now() <= otp.expiresAt;

                // Nettoie le OTP après vérification
                if (isValid) {
                    otps = otps.filter(o => o.phoneNumber !== phoneNumber);
                }

                resolve({ success: isValid });
            }, 800);
        });
    }
};