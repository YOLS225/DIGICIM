import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';
import { Input, EmailInput } from '@/components/widget/input/simple-input';
import SimpleButton from '@/components/widget/buttons/simple-button';
import { showMessage } from 'react-native-flash-message';
import { user } from '@/components/objects/all-data_db';

export default function EditProfile({ navigation: { goBack } }: any) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      showMessage({ message: 'Profil mis à jour', description: 'Vos informations ont été sauvegardées.', type: 'success' });
      goBack();
    }, 1200);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.screen}>
        <SimpleHeader title="Modifier le profil" onPress={() => goBack()} />

        <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {/* Avatar section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {firstName?.[0]}{lastName?.[0]}
              </Text>
            </View>
            <TouchableOpacity style={styles.changePhotoBtn} activeOpacity={0.8}>
              <Ionicons name="camera" size={16} color={Colors.primary} />
              <Text style={styles.changePhotoText}>Changer la photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.formSection}>Informations personnelles</Text>
            <View style={styles.card}>
              <Input
                label="Prénom"
                placeholder="Ibrahim"
                value={firstName}
                onChangeText={setFirstName}
              />
              <Input
                label="Nom de famille"
                placeholder="Kpalouazer"
                value={lastName}
                onChangeText={setLastName}
              />
              <EmailInput
                label="Adresse e-mail"
                placeholder="exemple@email.com"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Text style={[styles.formSection, { marginTop: 24 }]}>Numéro de téléphone</Text>
            <View style={styles.card}>
              <View style={styles.phoneRow}>
                <View style={styles.phoneInfo}>
                  <Text style={styles.phoneLabel}>Numéro enregistré</Text>
                  <Text style={styles.phoneValue}>{user.phoneNumber}</Text>
                </View>
                <TouchableOpacity style={styles.changePhoneBtn} activeOpacity={0.8}>
                  <Text style={styles.changePhoneText}>Modifier</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.verifiedRow}>
                <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
                <Text style={styles.verifiedText}>Numéro vérifié</Text>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <SimpleButton
              buttonText="Enregistrer les modifications"
              buttonColor={Colors.primary}
              loading={saving}
              onPress={handleSave}
            />
          </View>
          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  avatarSection: {
    alignItems: 'center', paddingVertical: 32,
  },
  avatar: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.8, shadowRadius: 10, elevation: 4,
  },
  avatarText: { fontSize: 28, fontWeight: '800', color: Colors.primary },
  changePhotoBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    paddingHorizontal: 16, paddingVertical: 8,
    borderRadius: 20, backgroundColor: Colors.primaryLight,
  },
  changePhotoText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  form: { paddingHorizontal: 20 },
  formSection: {
    fontSize: 12, fontWeight: '700', color: Colors.textMuted,
    letterSpacing: 0.5, marginBottom: 12, marginLeft: 4, textTransform: 'uppercase',
  },
  card: {
    backgroundColor: Colors.surface, borderRadius: 16, padding: 16, gap: 4,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 6, elevation: 2,
  },
  phoneRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  phoneInfo: {},
  phoneLabel: { fontSize: 12, color: Colors.textMuted, fontWeight: '500' },
  phoneValue: { fontSize: 16, color: Colors.textPrimary, fontWeight: '700', marginTop: 3 },
  changePhoneBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: Colors.primaryLight, borderRadius: 8 },
  changePhoneText: { fontSize: 13, color: Colors.primary, fontWeight: '600' },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  verifiedText: { fontSize: 12, color: Colors.success, fontWeight: '500' },
  footer: { paddingHorizontal: 20, marginTop: 24 },
});
