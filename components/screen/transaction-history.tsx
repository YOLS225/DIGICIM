import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';

const ALL_TRANSACTIONS = [
  { id: 'TXN-0012', label: 'Rechargement MTN', amount: 50000, type: 'credit' as const, date: 'Aujourd\'hui, 10:30', status: 'success' },
  { id: 'TXN-0011', label: 'Achat CPJ 42,5 - 5T', amount: -425000, type: 'debit' as const, date: 'Hier, 14:15', status: 'success' },
  { id: 'TXN-0010', label: 'Rechargement Orange', amount: 100000, type: 'credit' as const, date: '10 Mars, 08:45', status: 'success' },
  { id: 'TXN-0009', label: 'Achat CEM II 32,5 - 2T', amount: -144000, type: 'debit' as const, date: '05 Mars, 16:20', status: 'success' },
  { id: 'TXN-0008', label: 'Rechargement Wave', amount: 75000, type: 'credit' as const, date: '02 Mars, 11:00', status: 'success' },
  { id: 'TXN-0007', label: 'Rechargement MTN', amount: 25000, type: 'credit' as const, date: '28 Fév, 09:30', status: 'failed' },
  { id: 'TXN-0006', label: 'Achat CPA 55 - 3T', amount: -294000, type: 'debit' as const, date: '18 Fév, 13:10', status: 'success' },
  { id: 'TXN-0005', label: 'Rechargement Orange', amount: 200000, type: 'credit' as const, date: '10 Fév, 17:00', status: 'success' },
];

const FILTERS = ['Tous', 'Entrées', 'Sorties', 'Échoués'];

export default function TransactionHistory({ navigation: { goBack } }: any) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');

  const filtered = ALL_TRANSACTIONS.filter(t => {
    const matchSearch = t.label.toLowerCase().includes(search.toLowerCase()) ||
      t.id.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === 'Tous' ||
      (activeFilter === 'Entrées' && t.type === 'credit') ||
      (activeFilter === 'Sorties' && t.type === 'debit') ||
      (activeFilter === 'Échoués' && t.status === 'failed');
    return matchSearch && matchFilter;
  });

  const totalIn = ALL_TRANSACTIONS.filter(t => t.type === 'credit' && t.status !== 'failed').reduce((s, t) => s + t.amount, 0);
  const totalOut = ALL_TRANSACTIONS.filter(t => t.type === 'debit').reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <View style={styles.screen}>
      <SimpleHeader title="Historique" onPress={() => goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderLeftColor: Colors.success }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: Colors.successLight }]}>
                <Ionicons name="arrow-down" size={14} color={Colors.success} />
              </View>
              <Text style={styles.statLabel}>Total entré</Text>
            </View>
            <Text style={[styles.statValue, { color: Colors.success }]}>
              +{totalIn.toLocaleString('fr-FR')}
            </Text>
            <Text style={styles.statCurrency}>FCFA</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: Colors.primary }]}>
            <View style={styles.statHeader}>
              <View style={[styles.statIcon, { backgroundColor: Colors.primaryLight }]}>
                <Ionicons name="arrow-up" size={14} color={Colors.primary} />
              </View>
              <Text style={styles.statLabel}>Total sorti</Text>
            </View>
            <Text style={[styles.statValue, { color: Colors.primary }]}>
              -{totalOut.toLocaleString('fr-FR')}
            </Text>
            <Text style={styles.statCurrency}>FCFA</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={Colors.textMuted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher une transaction..."
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

        {/* List */}
        <View style={styles.listContainer}>
          <Text style={styles.resultCount}>{filtered.length} transaction{filtered.length > 1 ? 's' : ''}</Text>
          {filtered.map((t, i) => {
            const isCredit = t.type === 'credit';
            const isFailed = t.status === 'failed';
            return (
              <TouchableOpacity key={t.id} style={styles.txCard} activeOpacity={0.8}>
                <View style={[
                  styles.txIcon,
                  { backgroundColor: isFailed ? Colors.divider : isCredit ? Colors.successLight : Colors.primaryLight }
                ]}>
                  <Ionicons
                    name={isFailed ? 'close' : isCredit ? 'arrow-down' : 'arrow-up'}
                    size={18}
                    color={isFailed ? Colors.textMuted : isCredit ? Colors.success : Colors.primary}
                  />
                </View>
                <View style={styles.txInfo}>
                  <Text style={styles.txLabel}>{t.label}</Text>
                  <View style={styles.txMeta}>
                    <Text style={styles.txId}>{t.id}</Text>
                    <Text style={styles.txDot}>·</Text>
                    <Text style={styles.txDate}>{t.date}</Text>
                  </View>
                </View>
                <View style={styles.txRight}>
                  <Text style={[
                    styles.txAmount,
                    { color: isFailed ? Colors.textMuted : isCredit ? Colors.success : Colors.primary }
                  ]}>
                    {isCredit ? '+' : ''}{Math.abs(t.amount).toLocaleString('fr-FR')} F
                  </Text>
                  {isFailed && (
                    <View style={styles.failedBadge}>
                      <Text style={styles.failedText}>Échoué</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  statsRow: { flexDirection: 'row', gap: 12, marginHorizontal: 20, marginTop: 16, marginBottom: 8 },
  statCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: 16, padding: 16, borderLeftWidth: 3,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
  },
  statHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  statIcon: { width: 26, height: 26, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  statLabel: { fontSize: 12, color: Colors.textMuted, fontWeight: '500' },
  statValue: { fontSize: 20, fontWeight: '800', letterSpacing: -0.5 },
  statCurrency: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  searchBar: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: Colors.surface, marginHorizontal: 20, marginVertical: 8,
    borderRadius: 14, padding: 14, borderWidth: 1.5, borderColor: Colors.border,
  },
  searchInput: { flex: 1, fontSize: 14, color: Colors.textPrimary },
  filtersRow: { paddingHorizontal: 20, gap: 8, paddingBottom: 12 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  filterTextActive: { color: '#fff' },
  listContainer: { paddingHorizontal: 20, gap: 10 },
  resultCount: { fontSize: 12, color: Colors.textMuted, fontWeight: '600', marginBottom: 4 },
  txCard: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: Colors.surface, borderRadius: 14, padding: 14,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 2,
  },
  txIcon: { width: 42, height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  txInfo: { flex: 1 },
  txLabel: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary, marginBottom: 4 },
  txMeta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  txId: { fontSize: 11, color: Colors.textMuted },
  txDot: { fontSize: 11, color: Colors.textMuted },
  txDate: { fontSize: 11, color: Colors.textMuted },
  txRight: { alignItems: 'flex-end', gap: 4 },
  txAmount: { fontSize: 14, fontWeight: '800' },
  failedBadge: { backgroundColor: Colors.errorLight, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  failedText: { fontSize: 10, color: Colors.error, fontWeight: '700' },
});
