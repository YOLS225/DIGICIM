import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';

const MESSAGE_TYPES = [
  {
    key: 'ACHAT',
    label: 'Achat de ciment',
    description: 'Une question ou un problème concernant votre achat de ciment',
    icon: 'cube' as const,
    color: Colors.primary,
    bg: Colors.primaryLight,
    route: 'Send-message',
  },
  {
    key: 'RECHARGEMENT',
    label: 'Rechargement',
    description: 'Un problème ou une demande liée au rechargement de votre compte',
    icon: 'add-circle' as const,
    color: Colors.success,
    bg: Colors.successLight,
    route: 'Send-message',
  },
  {
    key: 'QUESTION',
    label: 'Question générale',
    description: 'Toute autre question relative à nos services ou produits',
    icon: 'help-circle' as const,
    color: '#8B5CF6',
    bg: '#EDE9FE',
    route: 'Send-message',
  },
];

export function ChooseMessage({ navigation: { navigate } }: any) {
  return (
    <View style={styles.screen}>
      <SimpleHeader title="Nouveau message" onPress={() => navigate('Contact-us')} />

      <View style={styles.container}>
        <Text style={styles.heading}>Quel est le sujet{'\n'}de votre message ?</Text>
        <Text style={styles.subtext}>Choisissez la catégorie qui correspond le mieux à votre demande.</Text>

        <View style={styles.cards}>
          {MESSAGE_TYPES.map((type) => (
            <TouchableOpacity
              key={type.key}
              style={styles.card}
              onPress={() => navigate(type.route, { name: type.key })}
              activeOpacity={0.8}
            >
              <View style={[styles.cardIcon, { backgroundColor: type.bg }]}>
                <Ionicons name={type.icon} size={26} color={type.color} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{type.label}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{type.description}</Text>
              </View>
              <View style={styles.cardArrow}>
                <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: 24 },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 34,
    marginBottom: 10,
  },
  subtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 21,
    marginBottom: 28,
  },
  cards: { gap: 12 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    gap: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIcon: {
    width: 52, height: 52, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  cardDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },
  cardArrow: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center',
  },
});
