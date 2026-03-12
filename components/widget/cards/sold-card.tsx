import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import TransactionCard from '@/components/widget/cards/transaction-card';
import OperationsGrid from '@/components/widget/cards/operation-card';

const screenHeight = Dimensions.get('window').height;

const SoldeTotal = ({ navigation }: any) => {
  const [isVisible, setIsVisible] = useState(false);

  const transactions: { label: string; amount: number; type: 'credit' | 'debit'; date: string }[] = [
    { label: 'Paiement Orange Money', amount: -2500, type: 'debit', date: 'Aujourd\'hui' },
    { label: 'Rechargement MTN', amount: 50000, type: 'credit', date: 'Hier' },
    { label: 'Achat CPJ 42.5', amount: -85000, type: 'debit', date: '10 Mars' },
  ];

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Balance Card */}
      <View style={styles.cardWrapper}>
        <LinearGradient
          colors={[Colors.dark, Colors.darkCard, '#243B55']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.balanceCard}
        >
          {/* Card top row */}
          <View style={styles.cardTop}>
            <View style={styles.walletIcon}>
              <Ionicons name="wallet" size={18} color="rgba(255,255,255,0.8)" />
            </View>
            <Text style={styles.cardLabel}>Solde disponible</Text>
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)} activeOpacity={0.7}>
              <Ionicons
                name={isVisible ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="rgba(255,255,255,0.7)"
              />
            </TouchableOpacity>
          </View>

          {/* Balance */}
          <Text style={styles.balance}>
            {isVisible ? '1 250 000' : '•  •  •  •  •  •'}
          </Text>
          {isVisible && <Text style={styles.currency}>FCFA</Text>}

          {/* Card bottom */}
          <View style={styles.cardBottom}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardInfoLabel}>N° Compte</Text>
              <Text style={styles.cardInfoValue}>225 07 00 75 78 73</Text>
            </View>
            <View style={styles.shimmer}>
              <MaterialCommunityIcons name="circle-double" size={36} color="rgba(200,16,46,0.6)" />
            </View>
          </View>
        </LinearGradient>
      </View>

      {/* Quick stats */}
      <View style={styles.statsRow}>
        <View style={[styles.statCard, { borderLeftColor: Colors.success }]}>
          <Text style={styles.statLabel}>Ce mois</Text>
          <Text style={[styles.statValue, { color: Colors.success }]}>+150 000</Text>
          <Text style={styles.statSub}>FCFA reçus</Text>
        </View>
        <View style={[styles.statCard, { borderLeftColor: Colors.primary }]}>
          <Text style={styles.statLabel}>Dépenses</Text>
          <Text style={[styles.statValue, { color: Colors.primary }]}>-87 500</Text>
          <Text style={styles.statSub}>FCFA sortis</Text>
        </View>
      </View>

      {/* Operations */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <OperationsGrid navigation={navigation} />
      </View>

      {/* Transactions */}
      <TransactionCard data={transactions} />

      <View style={{ height: 40 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: { paddingBottom: 20 },
  cardWrapper: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 10,
  },
  balanceCard: {
    padding: 24,
    minHeight: 180,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  walletIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardLabel: {
    flex: 1,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  balance: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: 4,
  },
  currency: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '500',
    marginBottom: 20,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  cardInfo: {},
  cardInfoLabel: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginBottom: 3 },
  cardInfoValue: { fontSize: 13, color: 'rgba(255,255,255,0.85)', fontWeight: '600' },
  shimmer: { opacity: 0.8 },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginHorizontal: 20,
    marginTop: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 3,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 2,
  },
  statLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '500', marginBottom: 4 },
  statValue: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  statSub: { fontSize: 11, color: Colors.textMuted, marginTop: 2 },
  section: {
    paddingHorizontal: 20,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 16,
  },
});

export default SoldeTotal;
