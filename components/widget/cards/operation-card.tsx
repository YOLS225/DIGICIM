import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface OperationItem {
  icon: string;
  label: string;
  color: string;
  bg: string;
  route: string;
}

const operations: OperationItem[] = [
  { icon: 'add-circle', label: 'Se recharger', color: Colors.success, bg: Colors.successLight, route: 'Rechargement' },
  { icon: 'cube', label: 'Acheter ciment', color: Colors.primary, bg: Colors.primaryLight, route: 'Factories' },
  { icon: 'pricetag', label: 'Nos offres', color: '#F59E0B', bg: '#FEF3C7', route: 'Offers' },
  { icon: 'receipt', label: 'Mes commandes', color: '#8B5CF6', bg: '#EDE9FE', route: 'Orders' },
];

const OperationsGrid = ({ navigation }: any) => {
  const { navigate } = navigation;
  const cardWidth = (Dimensions.get('window').width - 40 - 12) / 2;

  return (
    <View style={styles.grid}>
      {operations.map((op, i) => (
        <TouchableOpacity
          key={i}
          style={[styles.card, { width: cardWidth }]}
          onPress={() => navigate(op.route)}
          activeOpacity={0.8}
        >
          <View style={[styles.iconWrap, { backgroundColor: op.bg }]}>
            <Ionicons name={op.icon as any} size={24} color={op.color} />
          </View>
          <Text style={styles.label}>{op.label}</Text>
          <Ionicons name="arrow-forward" size={14} color={Colors.textMuted} style={{ marginTop: 4 }} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export { OperationsGrid as OperationCard };
export default OperationsGrid;

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 18,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 3,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
});
