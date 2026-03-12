import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface InputProps {
  label?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  color?: string;
  textColor?: string;
  error?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: any;
  autoCapitalize?: any;
}

export const Input = ({ label, placeholder, error, value, onChangeText, keyboardType, autoCapitalize }: InputProps) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, focused && styles.focused, !!error && styles.errorBorder]}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export const SecureInput = ({ label, placeholder, error, value, onChangeText }: InputProps) => {
  const [secure, setSecure] = useState(true);
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, focused && styles.focused, !!error && styles.errorBorder]}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textMuted}
          secureTextEntry={secure}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <TouchableOpacity onPress={() => setSecure(!secure)} style={styles.eyeBtn}>
          <Ionicons name={secure ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export const EmailInput = ({ label, placeholder, error, value, onChangeText }: InputProps) => (
  <Input
    label={label}
    placeholder={placeholder}
    error={error}
    value={value}
    onChangeText={onChangeText}
    keyboardType="email-address"
    autoCapitalize="none"
  />
);

export const PhoneInput = ({ label, placeholder, error, value, onChangeText }: InputProps) => (
  <Input
    label={label}
    placeholder={placeholder}
    error={error}
    value={value}
    onChangeText={onChangeText}
    keyboardType="phone-pad"
    autoCapitalize="none"
  />
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    marginLeft: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 16,
    height: 54,
  },
  focused: {
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 2,
  },
  errorBorder: {
    borderColor: Colors.error,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  eyeBtn: {
    padding: 4,
  },
  error: {
    fontSize: 12,
    color: Colors.error,
    marginTop: 6,
    marginLeft: 4,
  },
});
