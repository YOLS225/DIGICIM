import React, { useState } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, Platform,
  ScrollView, TouchableWithoutFeedback, Keyboard, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeaderWithoutBorder } from '@/components/widget/header/header-with-text';
import AmountInput from '@/components/widget/input/amount-input';
import SimpleButton from '@/components/widget/buttons/simple-button';
import RechargementDialog from '@/components/widget/alert-dialog/rechargement-dialog';
import { showMessage } from 'react-native-flash-message';
import { ActivityIndicator } from 'react-native-paper';

const QUICK_AMOUNTS = ['5 000', '10 000', '25 000', '50 000', '100 000'];

export default function Rechargement({ navigation: { navigate, goBack } }: any) {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);

  const handleAmountChange = (text: string) => {
    setAmount(text.replace(/[^0-9]/g, ''));
  };

  const handleQuickAmount = (val: string) => {
    setAmount(val.replace(/\s/g, ''));
  };

  const handleConfirm = () => setDialogVisible(true);
  const handleDismiss = () => setDialogVisible(false);

  const randomResult = () => {
    const success = Math.random() < 0.5;
    if (success) {
      showMessage({ message: 'Succès', description: 'Rechargement effectué avec succès.', type: 'success' });
      navigate('Main');
    } else {
      showMessage({ message: 'Échec', description: 'Une erreur est survenue lors du rechargement.', type: 'danger' });
      setAmount('');
    }
  };

  const handleValidation = () => {
    setDialogVisible(false);
    setLoading(true);
    setTimeout(() => {
      randomResult();
      setLoading(false);
    }, 1500);
  };

  const formattedAmount = amount ? parseInt(amount).toLocaleString('fr-FR') : '0';

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <SimpleHeaderWithoutBorder title="Recharger mon compte" onPress={() => goBack()} />

          {/* Info card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="phone-portrait" size={20} color={Colors.primary} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Numéro à débiter</Text>
              <Text style={styles.infoValue}>+225 07 00 75 78 73</Text>
            </View>
            <View style={styles.infoBadge}>
              <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
            </View>
          </View>

          {/* Amount input */}
          <View style={styles.amountSection}>
            <Text style={styles.sectionLabel}>Montant à recharger</Text>
            <AmountInput
              value={amount}
              onChangeText={handleAmountChange}
              currency="FCFA"
            />
          </View>

          {/* Quick amounts */}
          <View style={styles.quickSection}>
            <Text style={styles.sectionLabel}>Montants rapides</Text>
            <View style={styles.quickRow}>
              {QUICK_AMOUNTS.map((val, i) => (
                <TouchableOpacity
                  key={i}
                  style={[
                    styles.quickChip,
                    amount === val.replace(/\s/g, '') && styles.quickChipActive,
                  ]}
                  onPress={() => handleQuickAmount(val)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.quickChipText,
                    amount === val.replace(/\s/g, '') && styles.quickChipTextActive,
                  ]}>
                    {val}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Montant à recevoir</Text>
              <Text style={styles.summaryValue}>{formattedAmount} FCFA</Text>
            </View>
            <View style={[styles.summaryRow, { borderTopWidth: 1, borderTopColor: Colors.divider, paddingTop: 12 }]}>
              <Text style={styles.summaryLabel}>Frais de transaction</Text>
              <Text style={[styles.summaryValue, { color: Colors.success }]}>Gratuit</Text>
            </View>
          </View>

          <SimpleButton
            buttonText="Confirmer le rechargement"
            buttonColor={Colors.primary}
            inactive={!amount || parseInt(amount) < 100}
            onPress={handleConfirm}
          />

          <RechargementDialog
            amount={formattedAmount}
            phoneNumber="07 00 75 78 73"
            visible={dialogVisible}
            onValid={handleValidation}
            onDismiss={handleDismiss}
          />
        </ScrollView>
      </TouchableWithoutFeedback>

      {loading && (
        <View style={styles.overlay}>
          <View style={styles.loaderCard}>
            <ActivityIndicator size="large" color={Colors.primary} />
            <Text style={styles.loaderText}>Traitement en cours...</Text>
          </View>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { flexGrow: 1, paddingBottom: 32 },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 2,
  },
  infoIcon: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
  },
  infoContent: { flex: 1 },
  infoLabel: { fontSize: 12, color: Colors.textMuted, fontWeight: '500' },
  infoValue: { fontSize: 15, color: Colors.textPrimary, fontWeight: '700', marginTop: 2 },
  infoBadge: {},
  amountSection: {
    marginHorizontal: 20,
    marginTop: 24,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 10,
    marginLeft: 2,
  },
  quickSection: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  quickRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  quickChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  quickChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  quickChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  quickChipTextActive: {
    color: '#fff',
  },
  summaryCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  summaryValue: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    gap: 16,
  },
  loaderText: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
});
