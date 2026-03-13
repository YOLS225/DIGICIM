import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';

interface Notif {
  id: number;
  type: 'order' | 'payment' | 'promo' | 'system';
  title: string;
  body: string;
  time: string;
  read: boolean;
}

const INITIAL_NOTIFS: Notif[] = [
  { id: 1, type: 'order', title: 'Commande expédiée', body: 'Votre commande CMD-2026-0038 a été expédiée depuis l\'usine Angré.', time: 'Il y a 2h', read: false },
  { id: 2, type: 'payment', title: 'Rechargement reçu', body: 'Un rechargement de 50 000 FCFA a été crédité sur votre compte.', time: 'Il y a 5h', read: false },
  { id: 3, type: 'promo', title: 'Offre spéciale 🎉', body: 'Profitez de 10% de remise sur le CPJ 42,5 ce week-end seulement.', time: 'Hier', read: true },
  { id: 4, type: 'order', title: 'Commande confirmée', body: 'Votre commande CMD-2026-0045 a été confirmée par notre équipe.', time: 'Hier', read: true },
  { id: 5, type: 'system', title: 'Mise à jour disponible', body: 'Une nouvelle version de l\'application est disponible.', time: '10 Mars', read: true },
  { id: 6, type: 'payment', title: 'Rechargement échoué', body: 'Le rechargement de 25 000 FCFA a échoué. Veuillez réessayer.', time: '8 Mars', read: true },
];

const TYPE_CONFIG = {
  order: { icon: 'cube', color: Colors.primary, bg: Colors.primaryLight },
  payment: { icon: 'wallet', color: Colors.success, bg: Colors.successLight },
  promo: { icon: 'pricetag', color: '#F59E0B', bg: '#FEF3C7' },
  system: { icon: 'settings', color: '#8B5CF6', bg: '#EDE9FE' },
};

export default function Notifications({ navigation: { goBack } }: any) {
  const [notifs, setNotifs] = useState(INITIAL_NOTIFS);

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const today = notifs.filter((_, i) => i < 2);
  const older = notifs.filter((_, i) => i >= 2);

  return (
    <View style={styles.screen}>
      <SimpleHeader title="Notifications" onPress={() => goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header actions */}
        <View style={styles.topBar}>
          {unreadCount > 0 ? (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{unreadCount} non lue{unreadCount > 1 ? 's' : ''}</Text>
            </View>
          ) : (
            <Text style={styles.allRead}>Tout est lu</Text>
          )}
          {unreadCount > 0 && (
            <TouchableOpacity onPress={markAllRead} activeOpacity={0.7}>
              <Text style={styles.markAllText}>Tout marquer comme lu</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Today */}
        {today.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aujourd'hui</Text>
            {today.map(n => (
              <TouchableOpacity
                key={n.id}
                style={[styles.notifCard, !n.read && styles.notifUnread]}
                onPress={() => markRead(n.id)}
                activeOpacity={0.85}
              >
                <View style={[styles.notifIcon, { backgroundColor: TYPE_CONFIG[n.type].bg }]}>
                  <Ionicons name={TYPE_CONFIG[n.type].icon as any} size={20} color={TYPE_CONFIG[n.type].color} />
                </View>
                <View style={styles.notifContent}>
                  <Text style={styles.notifTitle}>{n.title}</Text>
                  <Text style={styles.notifBody} numberOfLines={2}>{n.body}</Text>
                  <Text style={styles.notifTime}>{n.time}</Text>
                </View>
                {!n.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Older */}
        {older.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Plus ancien</Text>
            {older.map(n => (
              <TouchableOpacity
                key={n.id}
                style={[styles.notifCard, !n.read && styles.notifUnread]}
                onPress={() => markRead(n.id)}
                activeOpacity={0.85}
              >
                <View style={[styles.notifIcon, { backgroundColor: TYPE_CONFIG[n.type].bg }]}>
                  <Ionicons name={TYPE_CONFIG[n.type].icon as any} size={20} color={TYPE_CONFIG[n.type].color} />
                </View>
                <View style={styles.notifContent}>
                  <Text style={styles.notifTitle}>{n.title}</Text>
                  <Text style={styles.notifBody} numberOfLines={2}>{n.body}</Text>
                  <Text style={styles.notifTime}>{n.time}</Text>
                </View>
                {!n.read && <View style={styles.unreadDot} />}
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  topBar: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 14,
  },
  unreadBadge: {
    backgroundColor: Colors.primaryLight, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8,
  },
  unreadCount: { fontSize: 12, fontWeight: '700', color: Colors.primary },
  allRead: { fontSize: 13, color: Colors.textMuted, fontWeight: '500' },
  markAllText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  section: { paddingHorizontal: 20, marginBottom: 8 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.5, marginBottom: 12, textTransform: 'uppercase' },
  notifCard: {
    flexDirection: 'row', gap: 14, alignItems: 'flex-start',
    backgroundColor: Colors.surface, borderRadius: 16, padding: 16, marginBottom: 10,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 6, elevation: 2,
  },
  notifUnread: {
    borderLeftWidth: 3, borderLeftColor: Colors.primary,
  },
  notifIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  notifContent: { flex: 1 },
  notifTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  notifBody: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19, marginBottom: 6 },
  notifTime: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary, marginTop: 4, flexShrink: 0 },
});
