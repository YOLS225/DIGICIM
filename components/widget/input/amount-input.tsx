import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type AmountInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  currency?: string;
};

const AmountInput = ({
  value,
  onChangeText,
  placeholder = '0',
  currency = 'FCFA',
}: AmountInputProps) => {
  const [focused, setFocused] = useState(false);

  const formatted = value ? parseInt(value).toLocaleString('fr-FR') : '';

  return (
    <View style={[styles.container, focused && styles.focused]}>
      <Text style={styles.label}>Montant</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={formatted}
          onChangeText={(text) => onChangeText(text.replace(/\s/g, '').replace(/[^0-9]/g, ''))}
          placeholder={placeholder}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor={Colors.textMuted}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Text style={styles.currency}>{currency}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.border,
    padding: 20,
    alignItems: 'center',
  },
  focused: {
    borderColor: Colors.primary,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textMuted,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    fontSize: 36,
    fontWeight: '800',
    color: Colors.primary,
    textAlign: 'center',
    minWidth: 100,
    maxWidth: 220,
    letterSpacing: -1,
  },
  currency: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginTop: 8,
  },
});

export default AmountInput;
