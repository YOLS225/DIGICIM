import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';
import ProductCard from '@/components/widget/cards/cement-card';
import SimpleButton from '@/components/widget/buttons/simple-button';

const PRODUCTS = [
  { name: 'CPJ 42,5 (N)', price: 85000, unit: '1T' },
  { name: 'CEM II 32,5', price: 72000, unit: '1T' },
  { name: 'CPA 55', price: 98000, unit: '1T' },
  { name: 'CPJ 42,5 (R)', price: 88000, unit: '1T' },
  { name: 'Mortier sec', price: 45000, unit: '1T' },
  { name: 'Béton prêt', price: 120000, unit: 'M3' },
];

const CATEGORIES = ['Tous', 'Ciment', 'Béton', 'Mortier'];

export default function ChooseCement({ navigation: { navigate, goBack } }: any) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tous');
  const [cart, setCart] = useState(0);

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.screen}>
      <SimpleHeader title="Acheter du ciment" onPress={() => goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.heading}>Choisissez vos{'\n'}produits</Text>
          <View style={styles.cartBadge}>
            <Ionicons name="cart" size={20} color={Colors.primary} />
            {cart > 0 && (
              <View style={styles.cartCount}>
                <Text style={styles.cartCountText}>{cart}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un produit..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.catChip, activeCategory === cat && styles.catChipActive]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.catText, activeCategory === cat && styles.catTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Products grid */}
        <View style={styles.grid}>
          {filtered.map((p, i) => (
            <ProductCard
              key={i}
              name={p.name}
              price={p.price}
              unit={p.unit}
              onAdd={() => setCart(c => c + 1)}
            />
          ))}
        </View>

        <View style={{ height: 120 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.footer}>
        <SimpleButton
          buttonText={cart > 0 ? `Voir mon panier (${cart})` : 'Sélectionner des produits'}
          buttonColor={Colors.primary}
          inactive={cart === 0}
          onPress={() => navigate('Cart')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    marginBottom: 16,
  },
  heading: {
    fontSize: 24, fontWeight: '800', color: Colors.textPrimary,
    letterSpacing: -0.5, lineHeight: 32,
  },
  cartBadge: {
    width: 44, height: 44, borderRadius: 14,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  cartCount: {
    position: 'absolute', top: -4, right: -4,
    backgroundColor: Colors.primary,
    width: 18, height: 18, borderRadius: 9,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.background,
  },
  cartCountText: { fontSize: 10, fontWeight: '800', color: '#fff' },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.surface,
    marginHorizontal: 20, borderRadius: 14, padding: 14,
    borderWidth: 1.5, borderColor: Colors.border, marginBottom: 16,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary, fontWeight: '500' },
  categoriesRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  catChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border,
  },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  catTextActive: { color: '#fff' },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    gap: 12, paddingHorizontal: 18,
  },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.surface,
    padding: 20,
    paddingBottom: 32,
    borderTopWidth: 1, borderTopColor: Colors.divider,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 8,
  },
});
