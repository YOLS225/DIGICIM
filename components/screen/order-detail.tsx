import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';

const STEPS = [
  { label: 'Commande passée', done: true, date: '12 Mars, 09:15' },
  { label: 'Validée', done: true, date: '12 Mars, 09:30' },
  { label: 'En préparation', done: true, date: '12 Mars, 11:00' },
  { label: 'Expédiée', done: false, date: '—' },
  { label: 'Livrée', done: false, date: '—' },
];

export default function OrderDetail({ route, navigation: { navigate } }: any) {
  const order = route?.params?.order ?? {
    id: 'CMD-2026-0045',
    product: 'CPJ 42,5 (N) - 5T',
    factory: 'Usine Angré',
    amount: 425000,
    date: '12 Mars 2026',
    status: 'En cours',
    statusColor: Colors.warning,
    statusBg: Colors.warningLight,
    qty: 5,
    unitPrice: 85000,
    delivery: 5000,
    address: 'Cocody, Angré - Abidjan',
  };

  return (
    <View style={styles.screen}>
      <SimpleHeader title="Détail commande" onPress={() => navigate('Orders')} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Status card */}
        <LinearGradient
          colors={[Colors.dark, Colors.darkCard]}
          style={styles.statusCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.statusTop}>
            <Text style={styles.orderId}>{order.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: order.statusBg }]}>
              <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
            </View>
          </View>
          <Text style={styles.orderDate}>{order.date}</Text>
          <Text style={styles.orderAmount}>{order.amount.toLocaleString('fr-FR')} FCFA</Text>
        </LinearGradient>

        {/* Tracking */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suivi de commande</Text>
          <View style={styles.trackingCard}>
            {STEPS.map((step, i) => (
              <View key={i} style={styles.stepRow}>
                <View style={styles.stepLeft}>
                  <View style={[styles.stepDot, step.done && styles.stepDotDone]}>
                    {step.done && <Ionicons name="checkmark" size={12} color="#fff" />}
                  </View>
                  {i < STEPS.length - 1 && (
                    <View style={[styles.stepLine, step.done && styles.stepLineDone]} />
                  )}
                </View>
                <View style={styles.stepContent}>
                  <Text style={[styles.stepLabel, step.done && styles.stepLabelDone]}>
                    {step.label}
                  </Text>
                  <Text style={styles.stepDate}>{step.date}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Products */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Produits commandés</Text>
          <View style={styles.productCard}>
            <View style={styles.productRow}>
              <View style={styles.productIcon}>
                <Ionicons name="cube" size={22} color={Colors.primary} />
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{order.product}</Text>
                <Text style={styles.productUnit}>x{order.qty} unités × {order.unitPrice?.toLocaleString('fr-FR')} FCFA</Text>
              </View>
              <Text style={styles.productTotal}>
                {(order.qty * order.unitPrice).toLocaleString('fr-FR')} F
              </Text>
            </View>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Récapitulatif</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Sous-total</Text>
              <Text style={styles.summaryVal}>{(order.amount - order.delivery).toLocaleString('fr-FR')} FCFA</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Livraison</Text>
              <Text style={styles.summaryVal}>{order.delivery?.toLocaleString('fr-FR')} FCFA</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total payé</Text>
              <Text style={styles.totalVal}>{order.amount.toLocaleString('fr-FR')} FCFA</Text>
            </View>
          </View>
        </View>

        {/* Delivery */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations de livraison</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={[styles.infoIcon, { backgroundColor: Colors.primaryLight }]}>
                <Ionicons name="business" size={18} color={Colors.primary} />
              </View>
              <View>
                <Text style={styles.infoLabel}>Site de retrait</Text>
                <Text style={styles.infoVal}>{order.factory}</Text>
              </View>
            </View>
            <View style={[styles.infoRow, { marginTop: 12 }]}>
              <View style={[styles.infoIcon, { backgroundColor: '#E3F2FD' }]}>
                <Ionicons name="location" size={18} color="#1565C0" />
              </View>
              <View>
                <Text style={styles.infoLabel}>Adresse</Text>
                <Text style={styles.infoVal}>{order.address}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionBtn} activeOpacity={0.8}>
            <Ionicons name="download-outline" size={18} color={Colors.primary} />
            <Text style={styles.actionBtnText}>Télécharger la facture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionBtn, styles.actionBtnDanger]} activeOpacity={0.8}>
            <Ionicons name="close-circle-outline" size={18} color={Colors.error} />
            <Text style={[styles.actionBtnText, { color: Colors.error }]}>Annuler la commande</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  statusCard: {
    margin: 20, borderRadius: 20, padding: 24,
  },
  statusTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  orderId: { fontSize: 14, fontWeight: '700', color: 'rgba(255,255,255,0.7)' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '700' },
  orderDate: { fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 8 },
  orderAmount: { fontSize: 32, fontWeight: '800', color: '#fff', letterSpacing: -1 },
  section: { paddingHorizontal: 20, marginBottom: 8 },
  sectionTitle: { fontSize: 12, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.5, marginBottom: 12, marginLeft: 4, textTransform: 'uppercase' },
  trackingCard: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 20,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
  },
  stepRow: { flexDirection: 'row', gap: 14, minHeight: 56 },
  stepLeft: { alignItems: 'center', width: 24 },
  stepDot: {
    width: 24, height: 24, borderRadius: 12,
    borderWidth: 2, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.background,
  },
  stepDotDone: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  stepLine: { flex: 1, width: 2, backgroundColor: Colors.border, marginVertical: 2 },
  stepLineDone: { backgroundColor: Colors.primary },
  stepContent: { flex: 1, paddingTop: 2, paddingBottom: 16 },
  stepLabel: { fontSize: 14, fontWeight: '600', color: Colors.textMuted },
  stepLabelDone: { color: Colors.textPrimary },
  stepDate: { fontSize: 12, color: Colors.textMuted, marginTop: 3 },
  productCard: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 16,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
  },
  productRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  productIcon: { width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  productInfo: { flex: 1 },
  productName: { fontSize: 14, fontWeight: '700', color: Colors.textPrimary },
  productUnit: { fontSize: 12, color: Colors.textMuted, marginTop: 3 },
  productTotal: { fontSize: 14, fontWeight: '800', color: Colors.textPrimary },
  summaryCard: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 16, gap: 12,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
  },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { fontSize: 13, color: Colors.textSecondary },
  summaryVal: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
  totalRow: { paddingTop: 12, borderTopWidth: 1, borderTopColor: Colors.divider },
  totalLabel: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  totalVal: { fontSize: 16, fontWeight: '800', color: Colors.primary },
  infoCard: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 16,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
  },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  infoIcon: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  infoLabel: { fontSize: 11, color: Colors.textMuted, fontWeight: '500' },
  infoVal: { fontSize: 14, color: Colors.textPrimary, fontWeight: '700', marginTop: 2 },
  actions: { paddingHorizontal: 20, marginTop: 8, gap: 10 },
  actionBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.primaryLight, borderRadius: 14, padding: 14,
  },
  actionBtnDanger: { backgroundColor: Colors.errorLight },
  actionBtnText: { fontSize: 14, fontWeight: '700', color: Colors.primary },
});
