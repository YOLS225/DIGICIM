import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';

const FEATURED_OFFER = {
  title: 'Pack Construction',
  subtitle: 'Économisez jusqu\'à 15% sur vos gros achats',
  badge: 'Offre limitée',
  endsIn: '5 jours',
};

const OFFERS = [
  {
    id: 1,
    title: 'Remise fidélité 10%',
    description: 'Pour tout achat supérieur à 500 000 FCFA',
    discount: '10%',
    category: 'Fidélité',
    validUntil: '31 Mars 2026',
    color: '#4F46E5',
    bg: '#EDE9FE',
    icon: 'star',
  },
  {
    id: 2,
    title: 'Offre saisonnière',
    description: 'CPJ 42,5 à prix réduit en mars',
    discount: '8%',
    category: 'Saisonnier',
    validUntil: '31 Mars 2026',
    color: Colors.success,
    bg: Colors.successLight,
    icon: 'pricetag',
  },
  {
    id: 3,
    title: 'Pack gros chantier',
    description: 'À partir de 10 tonnes commandées',
    discount: '15%',
    category: 'Volume',
    validUntil: '30 Juin 2026',
    color: Colors.primary,
    bg: Colors.primaryLight,
    icon: 'cube',
  },
  {
    id: 4,
    title: 'Première commande',
    description: 'Remise spéciale pour votre premier achat',
    discount: '5%',
    category: 'Nouveau client',
    validUntil: 'Sans limite',
    color: Colors.warning,
    bg: Colors.warningLight,
    icon: 'gift',
  },
];

const CATEGORIES = ['Toutes', 'Fidélité', 'Saisonnier', 'Volume', 'Nouveau client'];

export default function Offers({ navigation: { goBack } }: any) {
  const [activeCategory, setActiveCategory] = useState('Toutes');

  const filtered = activeCategory === 'Toutes'
    ? OFFERS
    : OFFERS.filter(o => o.category === activeCategory);

  return (
    <View style={styles.screen}>
      <SimpleHeader title="Nos offres" onPress={() => goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured banner */}
        <LinearGradient
          colors={[Colors.dark, Colors.darkCard]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featuredBanner}
        >
          <View style={styles.featuredBadge}>
            <Ionicons name="flash" size={12} color={Colors.warning} />
            <Text style={styles.featuredBadgeText}>{FEATURED_OFFER.badge}</Text>
          </View>
          <Text style={styles.featuredTitle}>{FEATURED_OFFER.title}</Text>
          <Text style={styles.featuredSubtitle}>{FEATURED_OFFER.subtitle}</Text>
          <View style={styles.featuredFooter}>
            <View style={styles.timerRow}>
              <Ionicons name="time-outline" size={14} color={Colors.textMuted} />
              <Text style={styles.timerText}>Expire dans {FEATURED_OFFER.endsIn}</Text>
            </View>
            <TouchableOpacity style={styles.featuredBtn} activeOpacity={0.8}>
              <Text style={styles.featuredBtnText}>En profiter</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, activeCategory === cat && styles.filterTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Offers list */}
        <View style={styles.offersList}>
          {filtered.map((offer) => (
            <TouchableOpacity key={offer.id} style={styles.offerCard} activeOpacity={0.8}>
              <View style={[styles.offerIconWrap, { backgroundColor: offer.bg }]}>
                <Ionicons name={offer.icon as any} size={24} color={offer.color} />
              </View>
              <View style={styles.offerInfo}>
                <View style={styles.offerTop}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <View style={[styles.discountBadge, { backgroundColor: offer.bg }]}>
                    <Text style={[styles.discountText, { color: offer.color }]}>-{offer.discount}</Text>
                  </View>
                </View>
                <Text style={styles.offerDesc}>{offer.description}</Text>
                <View style={styles.offerMeta}>
                  <Ionicons name="calendar-outline" size={12} color={Colors.textMuted} />
                  <Text style={styles.offerValid}>Valable jusqu'au {offer.validUntil}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  featuredBanner: {
    margin: 20, borderRadius: 20, padding: 24,
  },
  featuredBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(245,158,11,0.15)',
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4,
    borderRadius: 8, marginBottom: 12,
  },
  featuredBadgeText: { fontSize: 11, color: Colors.warning, fontWeight: '700' },
  featuredTitle: { fontSize: 22, fontWeight: '800', color: '#fff', letterSpacing: -0.3, marginBottom: 6 },
  featuredSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.7)', lineHeight: 20, marginBottom: 20 },
  featuredFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  timerText: { fontSize: 12, color: Colors.textMuted },
  featuredBtn: {
    backgroundColor: Colors.primary, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10,
  },
  featuredBtnText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  filtersRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  filterTextActive: { color: '#fff' },
  offersList: { paddingHorizontal: 20, gap: 12 },
  offerCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.surface, borderRadius: 16, padding: 16,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.7, shadowRadius: 6, elevation: 2,
  },
  offerIconWrap: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  offerInfo: { flex: 1 },
  offerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  offerTitle: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary, flex: 1 },
  discountBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, marginLeft: 8 },
  discountText: { fontSize: 12, fontWeight: '800' },
  offerDesc: { fontSize: 12, color: Colors.textSecondary, marginBottom: 6, lineHeight: 18 },
  offerMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  offerValid: { fontSize: 11, color: Colors.textMuted },
});
