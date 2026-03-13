import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { showMessage } from 'react-native-flash-message';
import { useAuth } from '@/context/AuthContext';

const CELL_COUNT = 4;

type Step = 'create' | 'confirm';

export default function PinSetup({ navigation: { navigate } }: any) {
  const { updateUser } = useAuth();
  const [step, setStep] = useState<Step>('create');
  const [firstPin, setFirstPin] = useState('');
  const [value, setValue] = useState('');

  const handleKeyPress = (key: string) => {
    if (key === 'DEL') {
      setValue(prev => prev.slice(0, -1));
    } else if (value.length < CELL_COUNT) {
      setValue(prev => prev + key);
    }
  };

  useEffect(() => {
    if (value.length !== CELL_COUNT) return;

    if (step === 'create') {
      setFirstPin(value);
      setValue('');
      setStep('confirm');
    } else {
      if (value === firstPin) {
        updateUser({ pinCode: value });
        showMessage({ message: 'Code PIN créé !', description: 'Votre code PIN a été défini avec succès.', type: 'success' });
        navigate('Main');
      } else {
        showMessage({ message: 'Codes différents', description: 'Les deux codes ne correspondent pas. Recommencez.', type: 'danger' });
        setValue('');
        setFirstPin('');
        setStep('create');
      }
    }
  }, [value]);

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'DEL'],
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Progress */}
      <View style={styles.progress}>
        <View style={[styles.progressStep, styles.progressDone]} />
        <View style={[styles.progressStep, styles.progressDone]} />
        <View style={[styles.progressStep, step === 'confirm' ? styles.progressDone : styles.progressActive]} />
      </View>

      <View style={styles.content}>
        <View style={styles.iconBadge}>
          <Ionicons name="lock-closed" size={28} color={Colors.primary} />
        </View>

        <Text style={styles.title}>
          {step === 'create' ? 'Créer votre code PIN' : 'Confirmer le code PIN'}
        </Text>
        <Text style={styles.subtitle}>
          {step === 'create'
            ? 'Choisissez un code à 4 chiffres pour sécuriser votre compte'
            : 'Saisissez à nouveau votre code PIN pour confirmer'}
        </Text>

        {/* Dots */}
        <View style={styles.dotsRow}>
          {Array.from({ length: CELL_COUNT }).map((_, i) => (
            <View key={i} style={[styles.dot, i < value.length && styles.dotFilled]} />
          ))}
        </View>

        {/* PIN hint */}
        {step === 'confirm' && (
          <View style={styles.hintRow}>
            <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
            <Text style={styles.hintText}>Code saisi, confirmez-le ci-dessus</Text>
          </View>
        )}
      </View>

      {/* Keypad */}
      <View style={styles.keyboard}>
        {keys.map((row, rowIndex) => (
          <View style={styles.row} key={rowIndex}>
            {row.map((key, index) => (
              key === '' ? (
                <View key={index} style={styles.keyEmpty} />
              ) : key === 'DEL' ? (
                <TouchableOpacity key={index} style={styles.keyDelete} onPress={() => handleKeyPress(key)} activeOpacity={0.7}>
                  <Ionicons name="backspace-outline" size={24} color={Colors.textPrimary} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity key={index} style={styles.key} onPress={() => handleKeyPress(key)} activeOpacity={0.7}>
                  <Text style={styles.keyText}>{key}</Text>
                </TouchableOpacity>
              )
            ))}
          </View>
        ))}
      </View>

      {step === 'confirm' && (
        <TouchableOpacity style={styles.backLink} onPress={() => { setStep('create'); setValue(''); setFirstPin(''); }} activeOpacity={0.7}>
          <Text style={styles.backLinkText}>Recommencer</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.background,
    alignItems: 'center', paddingTop: 60, paddingBottom: 32, paddingHorizontal: 32,
  },
  progress: { flexDirection: 'row', gap: 6, width: '100%', marginBottom: 48 },
  progressStep: { flex: 1, height: 4, borderRadius: 4, backgroundColor: Colors.border },
  progressActive: { backgroundColor: Colors.primaryLight },
  progressDone: { backgroundColor: Colors.primary },
  content: { alignItems: 'center', marginBottom: 48, flex: 1 },
  iconBadge: {
    width: 72, height: 72, borderRadius: 22,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  title: {
    fontSize: 24, fontWeight: '800', color: Colors.textPrimary,
    letterSpacing: -0.3, marginBottom: 10, textAlign: 'center',
  },
  subtitle: {
    fontSize: 14, color: Colors.textSecondary, textAlign: 'center',
    lineHeight: 22, marginBottom: 40, paddingHorizontal: 16,
  },
  dotsRow: { flexDirection: 'row', gap: 20 },
  dot: { width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: Colors.border, backgroundColor: 'transparent' },
  dotFilled: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  hintRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 16 },
  hintText: { fontSize: 12, color: Colors.success, fontWeight: '500' },
  keyboard: { alignItems: 'center' },
  row: { flexDirection: 'row', marginBottom: 14, gap: 14 },
  key: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 6, elevation: 3,
  },
  keyDelete: { width: 76, height: 76, borderRadius: 38, backgroundColor: Colors.errorLight, alignItems: 'center', justifyContent: 'center' },
  keyEmpty: { width: 76, height: 76 },
  keyText: { fontSize: 26, fontWeight: '600', color: Colors.textPrimary },
  backLink: { marginTop: 20 },
  backLinkText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
});
