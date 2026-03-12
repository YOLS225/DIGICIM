import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';

const FACTORIES = [
  {
    name: 'Usine Angré',
    city: 'Abidjan, Cocody',
    distance: '12 km',
    available: true,
    products: 8,
  },
  {
    name: 'Usine Yamoussoukro',
    city: 'Yamoussoukro, Centre',
    distance: '240 km',
    available: true,
    products: 6,
  },
  {
    name: 'Usine Bouaké',
    city: 'Bouaké, Centre-Nord',
    distance: '350 km',
    available: false,
    products: 4,
  },
];

export function ChooseFactory({ navigation: { navigate } }: any) {
  const [search, setSearch] = useState('');

  const filtered = FACTORIES.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <SimpleHeader title="Choisir un site" onPress={() => navigate('Main')} />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Sélectionnez{'\n'}votre cimenterie</Text>
        <Text style={styles.subtext}>Choisissez le site le plus proche pour votre commande.</Text>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un site..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>

        {/* Factory cards */}
        <View style={styles.cards}>
          {filtered.map((factory, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.card, !factory.available && styles.cardDisabled]}
              onPress={() => factory.available && navigate('Cement', { factory: factory.name })}
              activeOpacity={factory.available ? 0.8 : 1}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.cardIcon, { backgroundColor: factory.available ? Colors.primaryLight : Colors.divider }]}>
                  <Ionicons name="business" size={24} color={factory.available ? Colors.primary : Colors.textMuted} />
                </View>
                <View style={styles.cardInfo}>
                  <Text style={[styles.cardName, !factory.available && { color: Colors.textMuted }]}>
                    {factory.name}
                  </Text>
                  <View style={styles.cardMeta}>
                    <Ionicons name="location" size={12} color={Colors.textMuted} />
                    <Text style={styles.cardCity}>{factory.city}</Text>
                  </View>
                  <View style={styles.badgeRow}>
                    <View style={[
                      styles.badge,
                      { backgroundColor: factory.available ? Colors.successLight : Colors.divider }
                    ]}>
                      <Text style={[styles.badgeText, { color: factory.available ? Colors.success : Colors.textMuted }]}>
                        {factory.available ? 'Disponible' : 'Indisponible'}
                      </Text>
                    </View>
                    <Text style={styles.productCount}>{factory.products} produits</Text>
                  </View>
                </View>
              </View>

              <View style={styles.cardRight}>
                <Text style={styles.distance}>{factory.distance}</Text>
                {factory.available ? (
                  <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
                ) : (
                  <Ionicons name="lock-closed" size={16} color={Colors.textMuted} />
                )}
              </View>
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
  container: { flex: 1 },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.5,
    lineHeight: 34,
    marginTop: 8,
    paddingHorizontal: 24,
  },
  subtext: {
    fontSize: 14, color: Colors.textSecondary, lineHeight: 21,
    marginTop: 8, marginBottom: 20, paddingHorizontal: 24,
  },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.surface,
    marginHorizontal: 20, borderRadius: 14, padding: 14,
    borderWidth: 1.5, borderColor: Colors.border, marginBottom: 16,
  },
  searchInput: {
    flex: 1, fontSize: 14, color: Colors.textPrimary, fontWeight: '500',
  },
  cards: { gap: 12, paddingHorizontal: 20 },
  card: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: Colors.surface, borderRadius: 20, padding: 18,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7, shadowRadius: 8, elevation: 3,
  },
  cardDisabled: { opacity: 0.6 },
  cardLeft: { flexDirection: 'row', alignItems: 'flex-start', gap: 14, flex: 1 },
  cardIcon: {
    width: 52, height: 52, borderRadius: 16,
    alignItems: 'center', justifyContent: 'center',
  },
  cardInfo: { flex: 1 },
  cardName: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  cardMeta: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 8 },
  cardCity: { fontSize: 12, color: Colors.textMuted },
  badgeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: '600' },
  productCount: { fontSize: 11, color: Colors.textMuted },
  cardRight: { alignItems: 'flex-end', gap: 8 },
  distance: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
});
