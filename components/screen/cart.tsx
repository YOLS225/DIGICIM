import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';
import SimpleButton from '@/components/widget/buttons/simple-button';
import { showMessage } from 'react-native-flash-message';

const INITIAL_ITEMS = [
  {
    id: 1,
    name: 'CPJ 42,5 (N)',
    unit: '1T',
    price: 85000,
    qty: 2,
    image: 'https://media.istockphoto.com/id/476199756/photo/cement-bags-pile.jpg?s=1024x1024&w=is&k=20&c=EvgvCeTipBiAOQAlUHsaikhQCp0c3aIvlBAyzeJrLAc=',
  },
  {
    id: 2,
    name: 'CEM II 32,5',
    unit: '1T',
    price: 72000,
    qty: 1,
    image: 'https://media.istockphoto.com/id/476199756/photo/cement-bags-pile.jpg?s=1024x1024&w=is&k=20&c=EvgvCeTipBiAOQAlUHsaikhQCp0c3aIvlBAyzeJrLAc=',
  },
];

export default function Cart({ navigation: { navigate } }: any) {
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [placing, setPlacing] = useState(false);

  const updateQty = (id: number, delta: number) => {
    setItems(prev => prev
      .map(item => item.id === id ? { ...item, qty: Math.max(0, item.qty + delta) } : item)
      .filter(item => item.qty > 0)
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const delivery = 5000;
  const total = subtotal + delivery;

  const handleOrder = () => {
    setPlacing(true);
    setTimeout(() => {
      setPlacing(false);
      navigate('OrderConfirmation', {
        order: {
          id: `CMD-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`,
          product: items.map(i => `${i.name} - ${i.qty}T`).join(', '),
          factory: 'Usine Angré',
          amount: total,
          estimatedDate: '14-16 Mars 2026',
        }
      });
    }, 2000);
  };

  return (
    <View style={styles.screen}>
      <SimpleHeader title="Mon panier" onPress={() => navigate('Cement')} />

      {items.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="cart-outline" size={60} color={Colors.textMuted} />
          <Text style={styles.emptyTitle}>Panier vide</Text>
          <Text style={styles.emptySubtext}>Ajoutez des produits pour continuer</Text>
          <TouchableOpacity style={styles.backToShop} onPress={() => navigate('Factories')} activeOpacity={0.8}>
            <Text style={styles.backToShopText}>Parcourir les produits</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Factory info */}
            <View style={styles.factoryCard}>
              <View style={styles.factoryIcon}>
                <Ionicons name="business" size={18} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.factoryLabel}>Site de retrait</Text>
                <Text style={styles.factoryName}>Usine Angré</Text>
              </View>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.changeText}>Changer</Text>
              </TouchableOpacity>
            </View>

            {/* Items */}
            <View style={styles.itemsSection}>
              <Text style={styles.sectionTitle}>{items.length} article{items.length > 1 ? 's' : ''}</Text>
              {items.map(item => (
                <View key={item.id} style={styles.itemCard}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemUnit}>{item.unit}</Text>
                    <Text style={styles.itemPrice}>{item.price.toLocaleString('fr-FR')} FCFA</Text>
                  </View>
                  <View style={styles.qtyControl}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => updateQty(item.id, -1)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="remove" size={16} color={Colors.primary} />
                    </TouchableOpacity>
                    <Text style={styles.qtyNum}>{item.qty}</Text>
                    <TouchableOpacity
                      style={[styles.qtyBtn, { backgroundColor: Colors.primary }]}
                      onPress={() => updateQty(item.id, 1)}
                      activeOpacity={0.8}
                    >
                      <Ionicons name="add" size={16} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>

            {/* Summary */}
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Récapitulatif</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Sous-total</Text>
                <Text style={styles.summaryValue}>{subtotal.toLocaleString('fr-FR')} FCFA</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Frais de livraison</Text>
                <Text style={styles.summaryValue}>{delivery.toLocaleString('fr-FR')} FCFA</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>{total.toLocaleString('fr-FR')} FCFA</Text>
              </View>
            </View>

            <View style={{ height: 120 }} />
          </ScrollView>

          {/* Footer CTA */}
          <View style={styles.footer}>
            <View style={styles.totalPreview}>
              <Text style={styles.totalPreviewLabel}>Total</Text>
              <Text style={styles.totalPreviewValue}>{total.toLocaleString('fr-FR')} FCFA</Text>
            </View>
            <SimpleButton
              buttonText="Passer la commande"
              buttonColor={Colors.primary}
              loading={placing}
              onPress={handleOrder}
            />
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  empty: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 40, gap: 12,
  },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary },
  emptySubtext: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
  backToShop: {
    backgroundColor: Colors.primary, paddingHorizontal: 24, paddingVertical: 12,
    borderRadius: 14, marginTop: 8,
  },
  backToShopText: { fontSize: 14, fontWeight: '700', color: '#fff' },
  factoryCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.surface, margin: 20, borderRadius: 16, padding: 14,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
  },
  factoryIcon: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  factoryLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },
  factoryName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  changeText: { fontSize: 13, color: Colors.primary, fontWeight: '700', marginLeft: 'auto' },
  itemsSection: { paddingHorizontal: 20, gap: 10 },
  sectionTitle: {
    fontSize: 12, fontWeight: '700', color: Colors.textMuted,
    letterSpacing: 0.5, marginBottom: 4, textTransform: 'uppercase',
  },
  itemCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: Colors.surface, borderRadius: 16, padding: 14,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
  },
  itemImage: { width: 64, height: 64, borderRadius: 12 },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  itemUnit: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  itemPrice: { fontSize: 14, fontWeight: '800', color: Colors.primary, marginTop: 4 },
  qtyControl: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 30, height: 30, borderRadius: 8,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  qtyNum: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, minWidth: 20, textAlign: 'center' },
  summaryCard: {
    backgroundColor: Colors.surface, margin: 20, borderRadius: 16, padding: 20,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
    gap: 12,
  },
  summaryTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 4 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 13, color: Colors.textSecondary },
  summaryValue: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  totalRow: {
    paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.divider,
  },
  totalLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  totalValue: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.surface, padding: 20, paddingBottom: 32,
    borderTopWidth: 1, borderTopColor: Colors.divider,
    shadowColor: Colors.dark, shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 8,
    gap: 12,
  },
  totalPreview: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalPreviewLabel: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  totalPreviewValue: { fontSize: 18, fontWeight: '800', color: Colors.textPrimary },
});
