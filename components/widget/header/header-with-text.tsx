import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  backButton?: () => void;
  onPress?: () => void;
  rightAction?: React.ReactNode;
}

export function HeaderWithText({ title, backButton }: HeaderProps) {
  return (
    <View style={styles.baseHeader}>
      <TouchableOpacity onPress={backButton} style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
      </TouchableOpacity>
      {title ? <Text style={styles.baseTitle}>{title}</Text> : <View />}
      <View style={styles.placeholder} />
    </View>
  );
}

export function HeaderWithButton({ title, onPress, rightAction }: HeaderProps) {
  return (
    <View style={styles.homeHeader}>
      <View style={styles.homeHeaderContent}>
        <View>
          <Text style={styles.homeGreeting}>Bonjour</Text>
          <Text style={styles.homeTitle} numberOfLines={1}>{title ?? ''}</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          {rightAction}
          <TouchableOpacity onPress={onPress} style={styles.avatarBtn} activeOpacity={0.8}>
            <Ionicons name="person" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function SimpleHeader({ title, onPress }: HeaderProps) {
  return (
    <View style={styles.simpleHeader}>
      <TouchableOpacity onPress={onPress} style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.simpleTitle}>{title ?? ''}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

export function SimpleHeaderWithoutBorder({ title, onPress }: HeaderProps) {
  return (
    <View style={[styles.simpleHeader, { borderBottomWidth: 0 }]}>
      <TouchableOpacity onPress={onPress} style={styles.backBtn} activeOpacity={0.7}>
        <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
      </TouchableOpacity>
      <Text style={styles.simpleTitle}>{title ?? ''}</Text>
      <View style={styles.placeholder} />
    </View>
  );
}

const styles = StyleSheet.create({
  baseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.surface,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  baseTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  placeholder: {
    width: 40,
  },
  homeHeader: {
    backgroundColor: Colors.surface,
    paddingTop: 52,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  homeHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeGreeting: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  homeTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
    maxWidth: 260,
  },
  avatarBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  simpleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 52,
    paddingBottom: 16,
    paddingHorizontal: 20,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  simpleTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
});
