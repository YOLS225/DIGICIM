import React, { useState } from 'react';
import {
  View, Text, StyleSheet, KeyboardAvoidingView, Platform,
  TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import OtpInput from '@/components/widget/input/otp-input';
import SimpleButton from '@/components/widget/buttons/simple-button';

export default function PhonenumberVerify({ navigation: { navigate } }: any) {
  const [code, setCode] = useState('');
  const [resendTimer, setResendTimer] = useState(30);

  const handleCodeFilled = (c: string) => setCode(c);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {/* Back */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigate('Register')} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.content}>
            <View style={styles.iconBadge}>
              <Ionicons name="phone-portrait" size={26} color={Colors.primary} />
            </View>
            <Text style={styles.title}>Vérification</Text>
            <Text style={styles.subtitle}>
              Un code à 6 chiffres a été envoyé au{'\n'}
              <Text style={{ fontWeight: '700', color: Colors.textPrimary }}>+225 07 XX XX XX XX</Text>
            </Text>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
              <OtpInput codeLength={6} onCodeFilled={handleCodeFilled} />
            </View>

            {/* Resend */}
            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Vous n'avez pas reçu le code ?</Text>
              <TouchableOpacity activeOpacity={0.7}>
                <Text style={styles.resendLink}> Renvoyer</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* CTA */}
          <View style={styles.footer}>
            <SimpleButton
              buttonText="Valider le code"
              buttonColor={Colors.primary}
              inactive={code.length < 6}
              onPress={() => navigate('PinSetup')}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  backBtn: {
    width: 42, height: 42, borderRadius: 12,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    marginBottom: 40,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 4, elevation: 2,
  },
  content: { flex: 1 },
  iconBadge: {
    width: 64, height: 64, borderRadius: 20,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 24,
  },
  title: {
    fontSize: 30, fontWeight: '800', color: Colors.textPrimary,
    marginBottom: 12, letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14, color: Colors.textSecondary, lineHeight: 22, marginBottom: 40,
  },
  otpContainer: { marginBottom: 24 },
  resendRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 },
  resendText: { fontSize: 13, color: Colors.textSecondary },
  resendLink: { fontSize: 13, color: Colors.primary, fontWeight: '700' },
  footer: { paddingTop: 16 },
});
