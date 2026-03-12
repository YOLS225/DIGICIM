import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { user } from '@/components/objects/all-data_db';

interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  toggle?: boolean;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

const MENU_ITEMS: MenuSection[] = [
  {
    section: 'Mon compte',
    items: [
      { icon: 'person-outline', label: 'Informations personnelles', route: 'EditProfile' },
      { icon: 'key-outline', label: 'Changer le mot de passe', route: 'ChangePassword' },
      { icon: 'lock-closed-outline', label: 'Code PIN', route: 'ChangePin' },
    ],
  },
  {
    section: 'Préférences',
    items: [
      { icon: 'notifications-outline', label: 'Notifications', toggle: true },
      { icon: 'moon-outline', label: 'Mode sombre', toggle: true },
    ],
  },
  {
    section: 'Support',
    items: [
      { icon: 'help-circle-outline', label: 'Centre d\'aide', route: 'Help' },
      { icon: 'document-text-outline', label: 'Conditions d\'utilisation', route: 'Terms' },
      { icon: 'shield-checkmark-outline', label: 'Politique de confidentialité', route: 'Privacy' },
    ],
  },
];

export function Profil({ navigation: { navigate } }: any) {
  const userInfo = user;
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Mon Profil</Text>
      </View>

      {/* Profile card */}
      <View style={styles.profileCard}>
        <View style={styles.avatarLarge}>
          <Text style={styles.avatarInitials}>
            {userInfo?.firstName?.[0]}{userInfo?.lastName?.[0]}
          </Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{userInfo?.firstName} {userInfo?.lastName}</Text>
          <Text style={styles.profilePhone}>{userInfo?.phoneNumber}</Text>
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
            <Text style={styles.verifiedText}>Compte vérifié</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editBtn} activeOpacity={0.7} onPress={() => navigate('EditProfile')}>
          <Ionicons name="pencil" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNum}>12</Text>
          <Text style={styles.statLabel}>Commandes</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>1,25M</Text>
          <Text style={styles.statLabel}>FCFA dépensés</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNum}>3</Text>
          <Text style={styles.statLabel}>Cimenteries</Text>
        </View>
      </View>

      {/* Menu */}
      {MENU_ITEMS.map((section, si) => (
        <View key={si} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.section}</Text>
          <View style={styles.sectionCard}>
            {section.items.map((item, ii) => (
              <View key={ii}>
                <TouchableOpacity
                  style={styles.menuItem}
                  activeOpacity={item.toggle ? 1 : 0.7}
                  onPress={() => {
                    if (!item.toggle && item.route) navigate(item.route);
                  }}
                >
                  <View style={styles.menuIconWrap}>
                    <Ionicons name={item.icon as any} size={20} color={Colors.textSecondary} />
                  </View>
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  {item.toggle ? (
                    <Switch
                      value={item.label === 'Notifications' ? notifEnabled : darkMode}
                      onValueChange={(v) => {
                        if (item.label === 'Notifications') setNotifEnabled(v);
                        else setDarkMode(v);
                      }}
                      trackColor={{ false: Colors.border, true: Colors.primary }}
                      thumbColor="#fff"
                    />
                  ) : (
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  )}
                </TouchableOpacity>
                {ii < section.items.length - 1 && <View style={styles.itemDivider} />}
              </View>
            ))}
          </View>
        </View>
      ))}

      {/* Logout */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.version}>Big-CIM v1.0.0</Text>
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    paddingTop: 60, paddingHorizontal: 24, paddingBottom: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  pageTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -0.5 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: Colors.surface, margin: 20, borderRadius: 20, padding: 20,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.7, shadowRadius: 8, elevation: 3,
  },
  avatarLarge: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  avatarInitials: { fontSize: 22, fontWeight: '800', color: Colors.primary },
  profileInfo: { flex: 1 },
  profileName: { fontSize: 17, fontWeight: '800', color: Colors.textPrimary, marginBottom: 3 },
  profilePhone: { fontSize: 13, color: Colors.textSecondary, marginBottom: 6 },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  verifiedText: { fontSize: 12, color: Colors.success, fontWeight: '600' },
  editBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20, marginBottom: 8, borderRadius: 16, padding: 20,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 6, elevation: 2,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary, marginBottom: 3 },
  statLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '500', textAlign: 'center' },
  statDivider: { width: 1, height: 36, backgroundColor: Colors.divider },
  section: { paddingHorizontal: 20, marginTop: 16 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.5, marginBottom: 8, marginLeft: 4, textTransform: 'uppercase' },
  sectionCard: { backgroundColor: Colors.surface, borderRadius: 16, overflow: 'hidden', shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.5, shadowRadius: 6, elevation: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, paddingHorizontal: 16 },
  menuIconWrap: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  itemDivider: { height: 1, backgroundColor: Colors.divider, marginLeft: 66 },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: Colors.errorLight, borderRadius: 16, padding: 16,
  },
  logoutText: { fontSize: 15, fontWeight: '700', color: Colors.error },
  version: { textAlign: 'center', fontSize: 12, color: Colors.textMuted, marginTop: 20 },
});
