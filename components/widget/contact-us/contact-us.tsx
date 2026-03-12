import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const MESSAGES = [
  {
    id: 1,
    type: 'ACHAT',
    subject: 'Livraison',
    preview: 'Bonjour, ma commande n\'a pas encore...',
    date: 'Aujourd\'hui, 09:22',
    status: 'Répondu',
    unread: false,
  },
  {
    id: 2,
    type: 'RECHARGEMENT',
    subject: 'Rechargement non reçu',
    preview: 'J\'ai effectué un rechargement de 50 000...',
    date: 'Hier, 14:05',
    status: 'En attente',
    unread: true,
  },
  {
    id: 3,
    type: 'QUESTION',
    subject: 'Tarification',
    preview: 'Je souhaite connaître les tarifs pour...',
    date: '10 Mars',
    status: 'Répondu',
    unread: false,
  },
];

const TYPE_COLORS: Record<string, { color: string; bg: string; icon: any }> = {
  ACHAT: { color: Colors.primary, bg: Colors.primaryLight, icon: 'cube' },
  RECHARGEMENT: { color: Colors.success, bg: Colors.successLight, icon: 'add-circle' },
  QUESTION: { color: '#8B5CF6', bg: '#EDE9FE', icon: 'help-circle' },
};

export function ContactUs({ navigation }: any) {
  const { navigate } = navigation;

  return (
    <View style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Messages</Text>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => navigate('Choose')}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.newBtnText}>Nouveau</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Info banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="time-outline" size={18} color={Colors.warning} />
          <Text style={styles.infoText}>Réponse garantie sous 24h ouvrées</Text>
        </View>

        {/* Messages list */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Mes conversations</Text>
          {MESSAGES.map((msg) => {
            const typeInfo = TYPE_COLORS[msg.type] || TYPE_COLORS.QUESTION;
            return (
              <TouchableOpacity key={msg.id} style={styles.messageCard} activeOpacity={0.8} onPress={() => navigate('MessageDetail', { thread: msg })}>
                <View style={[styles.msgIcon, { backgroundColor: typeInfo.bg }]}>
                  <Ionicons name={typeInfo.icon} size={20} color={typeInfo.color} />
                </View>
                <View style={styles.msgContent}>
                  <View style={styles.msgTop}>
                    <Text style={styles.msgSubject}>{msg.subject}</Text>
                    <Text style={styles.msgDate}>{msg.date}</Text>
                  </View>
                  <Text style={styles.msgPreview} numberOfLines={1}>{msg.preview}</Text>
                  <View style={styles.msgBottom}>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: msg.status === 'Répondu' ? Colors.successLight : Colors.warningLight }
                    ]}>
                      <Text style={[
                        styles.statusText,
                        { color: msg.status === 'Répondu' ? Colors.success : Colors.warning }
                      ]}>
                        {msg.status}
                      </Text>
                    </View>
                    {msg.unread && <View style={styles.unreadDot} />}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Contact channels */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nous contacter directement</Text>
          <View style={styles.channelCard}>
            <TouchableOpacity style={styles.channel} activeOpacity={0.7}>
              <View style={[styles.channelIcon, { backgroundColor: '#E8F5E9' }]}>
                <Ionicons name="call" size={22} color="#2E7D32" />
              </View>
              <View style={styles.channelInfo}>
                <Text style={styles.channelLabel}>Téléphone</Text>
                <Text style={styles.channelValue}>+225 27 22 00 00 00</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
            <View style={styles.channelDivider} />
            <TouchableOpacity style={styles.channel} activeOpacity={0.7}>
              <View style={[styles.channelIcon, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="mail" size={22} color="#1565C0" />
              </View>
              <View style={styles.channelInfo}>
                <Text style={styles.channelLabel}>Email</Text>
                <Text style={styles.channelValue}>contact@bigcim.ci</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
            <View style={styles.channelDivider} />
            <TouchableOpacity style={styles.channel} activeOpacity={0.7}>
              <View style={[styles.channelIcon, { backgroundColor: '#F3E5F5' }]}>
                <Ionicons name="location" size={22} color="#6A1B9A" />
              </View>
              <View style={styles.channelInfo}>
                <Text style={styles.channelLabel}>Adresse</Text>
                <Text style={styles.channelValue}>Abidjan, Côte d'Ivoire</Text>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingTop: 60, paddingBottom: 16, paddingHorizontal: 24,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  pageTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -0.5 },
  newBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: Colors.primary, borderRadius: 12, paddingHorizontal: 14, paddingVertical: 8,
  },
  newBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  container: { flex: 1 },
  infoBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: Colors.warningLight, margin: 20, borderRadius: 12, padding: 14,
  },
  infoText: { fontSize: 13, color: '#92400E', fontWeight: '500', flex: 1 },
  section: { paddingHorizontal: 20, marginBottom: 8 },
  sectionTitle: {
    fontSize: 12, fontWeight: '700', color: Colors.textMuted,
    letterSpacing: 0.5, marginBottom: 12, marginLeft: 4, textTransform: 'uppercase',
  },
  messageCard: {
    flexDirection: 'row', gap: 12,
    backgroundColor: Colors.surface, borderRadius: 16, padding: 16, marginBottom: 10,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.7, shadowRadius: 6, elevation: 2,
  },
  msgIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  msgContent: { flex: 1 },
  msgTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  msgSubject: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  msgDate: { fontSize: 11, color: Colors.textMuted },
  msgPreview: { fontSize: 13, color: Colors.textSecondary, marginBottom: 8 },
  msgBottom: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  statusText: { fontSize: 11, fontWeight: '600' },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.primary },
  channelCard: { backgroundColor: Colors.surface, borderRadius: 16, overflow: 'hidden', shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 6, elevation: 2 },
  channel: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  channelIcon: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  channelInfo: { flex: 1 },
  channelLabel: { fontSize: 12, color: Colors.textMuted, fontWeight: '500' },
  channelValue: { fontSize: 14, color: Colors.textPrimary, fontWeight: '700', marginTop: 2 },
  channelDivider: { height: 1, backgroundColor: Colors.divider, marginLeft: 74 },
});
