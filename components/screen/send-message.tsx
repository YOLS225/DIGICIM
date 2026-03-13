import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';
import SimpleButton from '@/components/widget/buttons/simple-button';
import { showMessage } from 'react-native-flash-message';

const SUBJECTS_MAP: Record<string, string[]> = {
  ACHAT: ['Livraison', 'Qualité produit', 'Facturation', 'Annulation commande'],
  RECHARGEMENT: ['Rechargement non reçu', 'Montant incorrect', 'Délai de traitement', 'Autre'],
  QUESTION: ['Tarification', 'Disponibilité produit', 'Fonctionnement application', 'Autre'],
};

export function SendMessage({ route, navigation: { navigate, goBack } }: any) {
  const { name } = route.params;
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const subjects = SUBJECTS_MAP[name] || [];

  const iconMap: Record<string, any> = {
    ACHAT: { icon: 'cube', color: Colors.primary, bg: Colors.primaryLight, label: 'Achat de ciment' },
    RECHARGEMENT: { icon: 'add-circle', color: Colors.success, bg: Colors.successLight, label: 'Rechargement' },
    QUESTION: { icon: 'help-circle', color: '#8B5CF6', bg: '#EDE9FE', label: 'Question générale' },
  };

  const typeInfo = iconMap[name] || iconMap.QUESTION;

  const handleSend = () => {
    if (!message.trim()) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      showMessage({ message: 'Message envoyé', description: 'Notre équipe vous répondra sous 24h.', type: 'success' });
      navigate('Main', { screen: 'Contact-us' });
    }, 1500);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.screen}>
          <SimpleHeader title="Nouveau message" onPress={() => goBack()} />

          <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
            {/* Type badge */}
            <View style={[styles.typeBadge, { backgroundColor: typeInfo.bg }]}>
              <Ionicons name={typeInfo.icon} size={20} color={typeInfo.color} />
              <Text style={[styles.typeLabel, { color: typeInfo.color }]}>{typeInfo.label}</Text>
            </View>

            <Text style={styles.heading}>Rédigez votre{'\n'}message</Text>

            {/* Subject chips */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Sujet</Text>
              <View style={styles.subjectRow}>
                {subjects.map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.subjectChip, subject === s && styles.subjectChipActive]}
                    onPress={() => setSubject(s)}
                    activeOpacity={0.8}
                  >
                    <Text style={[styles.subjectText, subject === s && styles.subjectTextActive]}>
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Message input */}
            <View style={styles.section}>
              <Text style={styles.sectionLabel}>Votre message</Text>
              <View style={styles.textareaContainer}>
                <TextInput
                  style={styles.textarea}
                  multiline
                  numberOfLines={6}
                  placeholder="Décrivez votre problème ou question en détail..."
                  placeholderTextColor={Colors.textMuted}
                  value={message}
                  onChangeText={setMessage}
                  textAlignVertical="top"
                />
                <Text style={styles.charCount}>{message.length} / 500</Text>
              </View>
            </View>

            {/* Note */}
            <View style={styles.noteCard}>
              <Ionicons name="information-circle" size={16} color={Colors.warning} />
              <Text style={styles.noteText}>
                Notre équipe vous répondra dans un délai de 24h ouvrées.
              </Text>
            </View>

            <View style={{ height: 20 }} />
          </ScrollView>

          <View style={styles.footer}>
            <SimpleButton
              buttonText="Envoyer le message"
              buttonColor={Colors.primary}
              inactive={!message.trim()}
              loading={sending}
              onPress={handleSend}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1, padding: 24 },
  typeBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 8,
    borderRadius: 20, marginBottom: 16,
  },
  typeLabel: { fontSize: 13, fontWeight: '700' },
  heading: {
    fontSize: 26, fontWeight: '800', color: Colors.textPrimary,
    letterSpacing: -0.5, lineHeight: 34, marginBottom: 24,
  },
  section: { marginBottom: 20 },
  sectionLabel: {
    fontSize: 13, fontWeight: '600', color: Colors.textSecondary,
    marginBottom: 10, marginLeft: 2,
  },
  subjectRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  subjectChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border,
  },
  subjectChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  subjectText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  subjectTextActive: { color: '#fff' },
  textareaContainer: {
    backgroundColor: Colors.surface, borderRadius: 16,
    borderWidth: 1.5, borderColor: Colors.border, padding: 16,
  },
  textarea: {
    fontSize: 14, color: Colors.textPrimary, lineHeight: 22,
    minHeight: 130,
  },
  charCount: {
    fontSize: 11, color: Colors.textMuted, textAlign: 'right', marginTop: 8,
  },
  noteCard: {
    flexDirection: 'row', gap: 8, alignItems: 'flex-start',
    backgroundColor: Colors.warningLight, borderRadius: 12, padding: 14,
  },
  noteText: { flex: 1, fontSize: 12, color: '#92400E', lineHeight: 18 },
  footer: {
    backgroundColor: Colors.surface,
    padding: 20, paddingBottom: 32,
    borderTopWidth: 1, borderTopColor: Colors.divider,
  },
});
