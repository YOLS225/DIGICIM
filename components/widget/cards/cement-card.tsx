import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface ProductCardProps {
  name?: string;
  price?: number;
  unit?: string;
  imageUrl?: string;
  onAdd?: () => void;
  quantity?: number;
}

const cardWidth = (Dimensions.get('window').width - 48 - 12) / 2;

const ProductCard = ({
  name = 'CPJ 42,5 (N)',
  price = 85000,
  unit = '1T',
  imageUrl = 'https://media.istockphoto.com/id/476199756/photo/cement-bags-pile.jpg?s=1024x1024&w=is&k=20&c=EvgvCeTipBiAOQAlUHsaikhQCp0c3aIvlBAyzeJrLAc=',
  onAdd,
  quantity = 0,
}: ProductCardProps) => {
  const [qty, setQty] = useState(quantity);

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />

      {qty > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{qty}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{name} - {unit}</Text>
        <Text style={styles.price}>{price.toLocaleString('fr-FR')} FCFA</Text>
        <Text style={styles.priceLabel}>TTC</Text>
      </View>

      {qty === 0 ? (
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => setQty(1)}
          activeOpacity={0.8}
        >
          <Ionicons name="add" size={16} color="#fff" />
          <Text style={styles.addText}>Ajouter</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => setQty(Math.max(0, qty - 1))}
            activeOpacity={0.8}
          >
            <Ionicons name="remove" size={16} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{qty}</Text>
          <TouchableOpacity
            style={[styles.qtyBtn, { backgroundColor: Colors.primary }]}
            onPress={() => setQty(qty + 1)}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={16} color="#fff" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 3,
  },
  image: { width: '100%', height: 110 },
  badge: {
    position: 'absolute',
    top: 8, right: 8,
    backgroundColor: Colors.primary,
    width: 22, height: 22, borderRadius: 11,
    alignItems: 'center', justifyContent: 'center',
  },
  badgeText: { fontSize: 11, fontWeight: '800', color: '#fff' },
  info: { padding: 12 },
  name: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, lineHeight: 18, marginBottom: 4 },
  price: { fontSize: 15, fontWeight: '800', color: Colors.primary },
  priceLabel: { fontSize: 10, color: Colors.textMuted, marginTop: 1 },
  addBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 4, backgroundColor: Colors.primary,
    marginHorizontal: 12, marginBottom: 12,
    borderRadius: 10, paddingVertical: 8,
  },
  addText: { fontSize: 13, fontWeight: '700', color: '#fff' },
  qtyRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    marginHorizontal: 12, marginBottom: 12,
  },
  qtyBtn: {
    width: 32, height: 32, borderRadius: 8,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyText: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
});

export default ProductCard;
