import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

type Props = {
  amount: string;
  phoneNumber: string;
  visible: boolean;
  onValid: () => void;
  onDismiss: () => void;
};

const RechargementDialog = ({ visible, amount, phoneNumber, onValid, onDismiss }: Props) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onDismiss}>
      <View style={styles.overlay}>
        <View style={styles.dialog}>
          {/* Icon */}
          <View style={styles.iconWrap}>
            <Ionicons name="wallet" size={28} color={Colors.primary} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Confirmer le rechargement</Text>

          {/* Summary */}
          <View style={styles.summary}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Montant</Text>
              <Text style={styles.rowValue}>{amount} FCFA</Text>
            </View>
            <View style={[styles.row, styles.rowBorder]}>
              <Text style={styles.rowLabel}>Numéro</Text>
              <Text style={styles.rowValue}>+225 {phoneNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Frais</Text>
              <Text style={[styles.rowValue, { color: Colors.success }]}>Gratuit</Text>
            </View>
          </View>

          <Text style={styles.note}>
            Cette opération est irréversible. Veuillez vérifier les informations avant de confirmer.
          </Text>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onDismiss} activeOpacity={0.8}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} onPress={onValid} activeOpacity={0.8}>
              <Text style={styles.confirmText}>Confirmer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RechargementDialog;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  dialog: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 28,
    width: '100%',
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  iconWrap: {
    width: 60, height: 60, borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20, fontWeight: '800', color: Colors.textPrimary,
    textAlign: 'center', marginBottom: 20, letterSpacing: -0.3,
  },
  summary: {
    backgroundColor: Colors.background, borderRadius: 14, padding: 16, marginBottom: 16,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8 },
  rowBorder: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: Colors.border },
  rowLabel: { fontSize: 14, color: Colors.textSecondary, fontWeight: '500' },
  rowValue: { fontSize: 14, color: Colors.textPrimary, fontWeight: '700' },
  note: {
    fontSize: 12, color: Colors.textMuted, textAlign: 'center',
    lineHeight: 18, marginBottom: 24,
  },
  actions: { flexDirection: 'row', gap: 12 },
  cancelBtn: {
    flex: 1, height: 50, borderRadius: 14,
    borderWidth: 1.5, borderColor: Colors.border,
    alignItems: 'center', justifyContent: 'center',
  },
  cancelText: { fontSize: 15, fontWeight: '700', color: Colors.textSecondary },
  confirmBtn: {
    flex: 1, height: 50, borderRadius: 14,
    backgroundColor: Colors.primary,
    alignItems: 'center', justifyContent: 'center',
  },
  confirmText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
