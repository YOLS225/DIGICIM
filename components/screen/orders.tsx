import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';

const ORDERS = [
  {
    id: 'CMD-2026-0045',
    product: 'CPJ 42,5 (N) - 5T',
    factory: 'Usine Angré',
    amount: 425000,
    date: '12 Mars 2026',
    status: 'Livré',
    statusColor: Colors.success,
    statusBg: Colors.successLight,
  },
  {
    id: 'CMD-2026-0038',
    product: 'CEM II 32,5 - 2T',
    factory: 'Usine Angré',
    amount: 144000,
    date: '05 Mars 2026',
    status: 'En cours',
    statusColor: Colors.warning,
    statusBg: Colors.warningLight,
  },
  {
    id: 'CMD-2026-0021',
    product: 'CPA 55 - 3T',
    factory: 'Usine Yamoussoukro',
    amount: 294000,
    date: '18 Fév 2026',
    status: 'Livré',
    statusColor: Colors.success,
    statusBg: Colors.successLight,
  },
  {
    id: 'CMD-2026-0009',
    product: 'Mortier sec - 1T',
    factory: 'Usine Bouaké',
    amount: 45000,
    date: '02 Fév 2026',
    status: 'Annulé',
    statusColor: Colors.error,
    statusBg: Colors.errorLight,
  },
];

const FILTERS = ['Toutes', 'En cours', 'Livré', 'Annulé'];

export default function Orders({ navigation: { navigate } }: any) {
  const [activeFilter, setActiveFilter] = useState('Toutes');

  const filtered = activeFilter === 'Toutes'
    ? ORDERS
    : ORDERS.filter(o => o.status === activeFilter);

  return (
    <View style={styles.screen}>
      <SimpleHeader title="Mes commandes" onPress={() => navigate('Main')} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats bar */}
        <View style={styles.statsBar}>
          <View style={styles.stat}>
            <Text style={styles.statNum}>{ORDERS.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: Colors.warning }]}>
              {ORDERS.filter(o => o.status === 'En cours').length}
            </Text>
            <Text style={styles.statLabel}>En cours</Text>
          </View>
          <View style={styles.statDiv} />
          <View style={styles.stat}>
            <Text style={[styles.statNum, { color: Colors.success }]}>
              {ORDERS.filter(o => o.status === 'Livré').length}
            </Text>
            <Text style={styles.statLabel}>Livrés</Text>
          </View>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filtersRow}>
          {FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
              onPress={() => setActiveFilter(f)}
              activeOpacity={0.8}
            >
              <Text style={[styles.filterText, activeFilter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Orders */}
        <View style={styles.ordersContainer}>
          {filtered.length === 0 ? (
            <View style={styles.empty}>
              <Ionicons name="receipt-outline" size={48} color={Colors.textMuted} />
              <Text style={styles.emptyText}>Aucune commande</Text>
            </View>
          ) : (
            filtered.map((order) => (
              <TouchableOpacity key={order.id} style={styles.orderCard} activeOpacity={0.8} onPress={() => navigate('OrderDetail', { order })}>
                <View style={styles.orderTop}>
                  <View>
                    <Text style={styles.orderId}>{order.id}</Text>
                    <Text style={styles.orderDate}>{order.date}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: order.statusBg }]}>
                    <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
                  </View>
                </View>

                <View style={styles.orderDivider} />

                <View style={styles.orderBottom}>
                  <View style={styles.orderIconWrap}>
                    <Ionicons name="cube" size={20} color={Colors.primary} />
                  </View>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderProduct}>{order.product}</Text>
                    <View style={styles.orderMeta}>
                      <Ionicons name="business" size={12} color={Colors.textMuted} />
                      <Text style={styles.orderFactory}>{order.factory}</Text>
                    </View>
                  </View>
                  <Text style={styles.orderAmount}>{order.amount.toLocaleString('fr-FR')} F</Text>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  statsBar: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.surface, margin: 20, borderRadius: 16, padding: 16,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
  },
  stat: { flex: 1, alignItems: 'center' },
  statNum: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary },
  statLabel: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  statDiv: { width: 1, height: 32, backgroundColor: Colors.divider },
  filtersRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 16 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20,
    backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  filterTextActive: { color: '#fff' },
  ordersContainer: { paddingHorizontal: 20, gap: 12 },
  orderCard: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 16,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.7, shadowRadius: 6, elevation: 2,
  },
  orderTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  orderId: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  orderDate: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '700' },
  orderDivider: { height: 1, backgroundColor: Colors.divider, marginBottom: 12 },
  orderBottom: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  orderIconWrap: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
  },
  orderInfo: { flex: 1 },
  orderProduct: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  orderMeta: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 },
  orderFactory: { fontSize: 12, color: Colors.textMuted },
  orderAmount: { fontSize: 15, fontWeight: '800', color: Colors.textPrimary },
  empty: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 15, color: Colors.textMuted, fontWeight: '500' },
});
