import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, StatusBar, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function FirstScreen({ navigation: { navigate } }: any) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Hero image with overlay */}
      <View style={styles.heroSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop' }}
          style={styles.heroImage}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['transparent', 'rgba(13,27,42,0.7)', Colors.dark]}
          style={styles.gradient}
        />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>BIG</Text>
            <Text style={[styles.logoText, { color: Colors.primary }]}>CIM</Text>
          </View>
        </View>
      </View>

      {/* Bottom content */}
      <View style={styles.content}>
        <Text style={styles.headline}>Commandez votre{'\n'}ciment en toute{'\n'}simplicité.</Text>
        <Text style={styles.subtext}>
          Gérez votre compte, suivez vos commandes et rechargez votre solde depuis votre téléphone.
        </Text>

        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigate('Login')}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryBtnText}>Accéder à mon compte</Text>
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigate('Register')}
            activeOpacity={0.85}
          >
            <Text style={styles.secondaryBtnText}>Créer un compte</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.terms}>
          En continuant, vous acceptez nos{' '}
          <Text style={{ color: Colors.primary }}>Conditions d'utilisation</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark,
  },
  heroSection: {
    height: height * 0.52,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    position: 'absolute',
    top: 56,
    left: 28,
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.dark,
    paddingHorizontal: 28,
    paddingTop: 8,
    paddingBottom: 32,
  },
  headline: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 42,
    marginBottom: 14,
    letterSpacing: -0.5,
  },
  subtext: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 22,
    marginBottom: 32,
  },
  actions: {
    gap: 12,
  },
  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 16,
    height: 56,
    gap: 10,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  secondaryBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    height: 56,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.85)',
  },
  terms: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 20,
  },
});
