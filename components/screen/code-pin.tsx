import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/context/AuthContext';

const CELL_COUNT = 4;

export default function PinCodeScreen({ navigation }: any) {
  const { navigate } = navigation;
  const { user } = useAuth();
  const [value, setValue] = useState('');

  const handleKeyPress = (key: string) => {
    if (key === 'DEL') {
      setValue(prev => prev.slice(0, -1));
    } else if (value.length < CELL_COUNT) {
      setValue(prev => prev + key);
    }
  };

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      navigate('Main');
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

      {/* Avatar & greeting */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {(user?.firstName?.[0] ?? '') + (user?.lastName?.[0] ?? '')}
          </Text>
        </View>
        <Text style={styles.greeting}>Bienvenue,</Text>
        <Text style={styles.name}>{user?.firstName} {user?.lastName}</Text>
        <Text style={styles.subtitle}>Entrez votre code PIN pour continuer</Text>
      </View>

      {/* Dots indicator */}
      <View style={styles.dotsRow}>
        {Array.from({ length: CELL_COUNT }).map((_, i) => (
          <View key={i} style={[styles.dot, i < value.length && styles.dotFilled]} />
        ))}
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

      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={async () => {
          await signOut();
          navigation.reset({ index: 0, routes: [{ name: 'FirstScreen' }] });
        }}
        activeOpacity={0.7}
      >
        <Ionicons name="log-out-outline" size={15} color={Colors.textMuted} />
        <Text style={styles.logoutText}>Changer de compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: Colors.background,
    alignItems: 'center', paddingTop: 80, paddingBottom: 40, paddingHorizontal: 32,
  },
  header: { alignItems: 'center', marginBottom: 48 },
  avatar: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  greeting: { fontSize: 15, color: Colors.textSecondary, fontWeight: '500' },
  name: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, marginTop: 4, letterSpacing: -0.3 },
  subtitle: { fontSize: 13, color: Colors.textMuted, marginTop: 8 },
  dotsRow: { flexDirection: 'row', gap: 20, marginBottom: 56 },
  dot: {
    width: 16, height: 16, borderRadius: 8,
    borderWidth: 2, borderColor: Colors.border, backgroundColor: 'transparent',
  },
  dotFilled: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  keyboard: { width: '100%', alignItems: 'center' },
  row: { flexDirection: 'row', marginBottom: 14, gap: 14 },
  key: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 6, elevation: 3,
  },
  keyDelete: {
    width: 76, height: 76, borderRadius: 38,
    backgroundColor: Colors.errorLight, alignItems: 'center', justifyContent: 'center',
  },
  keyEmpty: { width: 76, height: 76 },
  keyText: { fontSize: 26, fontWeight: '600', color: Colors.textPrimary },
  logoutBtn: { marginTop: 32, flexDirection: 'row', alignItems: 'center', gap: 6 },
  logoutText: { fontSize: 13, color: Colors.textMuted, fontWeight: '500' },
});
