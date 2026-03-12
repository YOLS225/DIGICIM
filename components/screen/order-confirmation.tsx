import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

export default function OrderConfirmation({ route, navigation: { navigate, reset } }: any) {
  const order = route?.params?.order ?? {
    id: 'CMD-2026-0046',
    amount: 425000,
    product: 'CPJ 42,5 (N) - 5T',
    factory: 'Usine Angré',
    estimatedDate: '14-15 Mars 2026',
  };

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const goHome = () => {
    reset({ index: 0, routes: [{ name: 'Main' }] });
  };

  return (
    <View style={styles.screen}>
      {/* Success icon */}
      <Animated.View style={[styles.iconWrap, { transform: [{ scale: scaleAnim }] }]}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={44} color="#fff" />
        </View>
        <View style={styles.iconRing} />
      </Animated.View>

      {/* Content */}
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Commande confirmée !</Text>
        <Text style={styles.subtitle}>
          Votre commande a été enregistrée avec succès. Vous recevrez une notification de suivi.
        </Text>

        {/* Summary card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Ionicons name="receipt-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.summaryLabel}>Référence</Text>
            <Text style={styles.summaryVal}>{order.id}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="cube-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.summaryLabel}>Produit</Text>
            <Text style={styles.summaryVal} numberOfLines={1}>{order.product}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="business-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.summaryLabel}>Site</Text>
            <Text style={styles.summaryVal}>{order.factory}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="calendar-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.summaryLabel}>Livraison estimée</Text>
            <Text style={styles.summaryVal}>{order.estimatedDate}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Ionicons name="wallet-outline" size={16} color={Colors.textMuted} />
            <Text style={styles.summaryLabel}>Montant total</Text>
            <Text style={[styles.summaryVal, { color: Colors.primary, fontWeight: '800' }]}>
              {order.amount.toLocaleString('fr-FR')} FCFA
            </Text>
          </View>
        </View>

        {/* Actions */}
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigate('Orders')} activeOpacity={0.85}>
          <Text style={styles.primaryBtnText}>Suivre ma commande</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryBtn} onPress={goHome} activeOpacity={0.8}>
          <Text style={styles.secondaryBtnText}>Retour à l'accueil</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, backgroundColor: Colors.background,
    alignItems: 'center', justifyContent: 'center',
    paddingHorizontal: 28,
  },
  iconWrap: {
    alignItems: 'center', justifyContent: 'center',
    width: 120, height: 120, marginBottom: 40,
  },
  iconCircle: {
    width: 90, height: 90, borderRadius: 45,
    backgroundColor: Colors.success,
    alignItems: 'center', justifyContent: 'center',
    zIndex: 2,
  },
  iconRing: {
    position: 'absolute',
    width: 120, height: 120, borderRadius: 60,
    borderWidth: 3, borderColor: Colors.successLight,
  },
  content: { width: '100%', alignItems: 'center' },
  title: {
    fontSize: 28, fontWeight: '800', color: Colors.textPrimary,
    letterSpacing: -0.5, marginBottom: 12, textAlign: 'center',
  },
  subtitle: {
    fontSize: 14, color: Colors.textSecondary, textAlign: 'center',
    lineHeight: 22, marginBottom: 32,
  },
  summaryCard: {
    width: '100%', backgroundColor: Colors.surface, borderRadius: 20,
    padding: 20, marginBottom: 24,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.8, shadowRadius: 12, elevation: 4,
  },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  summaryLabel: { flex: 1, fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
  summaryVal: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary, maxWidth: 160, textAlign: 'right' },
  divider: { height: 1, backgroundColor: Colors.divider, marginVertical: 12 },
  primaryBtn: {
    width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: Colors.primary, borderRadius: 16, height: 54, marginBottom: 12,
  },
  primaryBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
  secondaryBtn: {
    width: '100%', alignItems: 'center', justifyContent: 'center',
    borderRadius: 16, height: 54, borderWidth: 1.5, borderColor: Colors.border,
  },
  secondaryBtnText: { fontSize: 16, fontWeight: '600', color: Colors.textSecondary },
});
