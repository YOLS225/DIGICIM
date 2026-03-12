import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface Transaction {
  label: string;
  amount: number;
  type?: 'credit' | 'debit';
  date?: string;
}

interface TransactionCardProps {
  data: Transaction[];
}

export default function TransactionCard({ data }: TransactionCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dernières transactions</Text>
        <TouchableOpacity style={styles.seeAllBtn} activeOpacity={0.7}>
          <Text style={styles.seeAll}>Voir tout</Text>
          <Ionicons name="arrow-forward" size={14} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {data?.length > 0 ? (
        data.map((t, i) => {
          const isCredit = (t.type === 'credit') || t.amount > 0;
          return (
            <View key={i} style={[styles.item, i < data.length - 1 && styles.itemBorder]}>
              <View style={[styles.iconWrap, { backgroundColor: isCredit ? Colors.successLight : Colors.errorLight }]}>
                <Ionicons
                  name={isCredit ? 'arrow-down' : 'arrow-up'}
                  size={16}
                  color={isCredit ? Colors.success : Colors.error}
                />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemLabel} numberOfLines={1}>{t.label}</Text>
                {t.date && <Text style={styles.itemDate}>{t.date}</Text>}
              </View>
              <Text style={[styles.itemAmount, { color: isCredit ? Colors.success : Colors.error }]}>
                {isCredit ? '+' : ''}{Math.abs(t.amount).toLocaleString()} FCFA
              </Text>
            </View>
          );
        })
      ) : (
        <View style={styles.empty}>
          <Ionicons name="receipt-outline" size={40} color={Colors.textMuted} />
          <Text style={styles.emptyText}>Aucune transaction</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginTop: 24,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary },
  seeAllBtn: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  seeAll: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  iconWrap: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  itemInfo: { flex: 1 },
  itemLabel: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  itemDate: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  itemAmount: { fontSize: 15, fontWeight: '700' },
  empty: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 10,
  },
  emptyText: { fontSize: 14, color: Colors.textMuted },
});
