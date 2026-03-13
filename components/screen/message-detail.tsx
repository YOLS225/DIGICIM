import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { SimpleHeader } from '@/components/widget/header/header-with-text';

interface Message {
  id: number;
  from: 'user' | 'agent';
  content: string;
  time: string;
}

const MOCK_MESSAGES: Message[] = [
  { id: 1, from: 'user', content: 'Bonjour, j\'ai effectué un rechargement de 50 000 FCFA mais je n\'ai pas encore reçu les fonds sur mon compte. Cela fait plus de 2 heures.', time: 'Hier, 14:05' },
  { id: 2, from: 'agent', content: 'Bonjour, nous avons bien reçu votre demande. Pouvez-vous nous communiquer votre numéro de téléphone et la référence de la transaction ?', time: 'Hier, 14:22' },
  { id: 3, from: 'user', content: 'Mon numéro est le 07 00 75 78 73. Je n\'ai pas de référence de transaction.', time: 'Hier, 14:30' },
  { id: 4, from: 'agent', content: 'Merci. Nous vérifions votre dossier. Nous vous reviendrons dans les 30 prochaines minutes.', time: 'Hier, 14:35' },
];

export default function MessageDetail({ route, navigation: { goBack } }: any) {
  const thread = route?.params?.thread ?? {
    id: 2,
    type: 'RECHARGEMENT',
    subject: 'Rechargement non reçu',
    status: 'En attente',
  };

  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [input, setInput] = useState('');
  const scrollRef = useRef<ScrollView>(null);

  const TYPE_INFO: Record<string, { color: string; bg: string; icon: any }> = {
    ACHAT: { color: Colors.primary, bg: Colors.primaryLight, icon: 'cube' },
    RECHARGEMENT: { color: Colors.success, bg: Colors.successLight, icon: 'add-circle' },
    QUESTION: { color: '#8B5CF6', bg: '#EDE9FE', icon: 'help-circle' },
  };

  const typeInfo = TYPE_INFO[thread.type] || TYPE_INFO.QUESTION;

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), from: 'user', content: input.trim(), time: 'À l\'instant' },
    ]);
    setInput('');
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.screen}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => goBack()} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <View style={[styles.threadIcon, { backgroundColor: typeInfo.bg }]}>
              <Ionicons name={typeInfo.icon} size={16} color={typeInfo.color} />
            </View>
            <View>
              <Text style={styles.headerTitle}>{thread.subject}</Text>
              <View style={styles.headerStatus}>
                <View style={[styles.statusDot, {
                  backgroundColor: thread.status === 'Répondu' ? Colors.success : Colors.warning
                }]} />
                <Text style={styles.headerStatusText}>{thread.status}</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.menuBtn} activeOpacity={0.7}>
            <Ionicons name="ellipsis-vertical" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Info banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="shield-checkmark" size={14} color={Colors.success} />
          <Text style={styles.infoText}>Conversation sécurisée · Réponse sous 24h</Text>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messagesList}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          {messages.map(msg => (
            <View
              key={msg.id}
              style={[
                styles.messageRow,
                msg.from === 'user' ? styles.messageRowUser : styles.messageRowAgent,
              ]}
            >
              {msg.from === 'agent' && (
                <View style={styles.agentAvatar}>
                  <Ionicons name="headset" size={14} color={Colors.primary} />
                </View>
              )}
              <View style={[
                styles.bubble,
                msg.from === 'user' ? styles.bubbleUser : styles.bubbleAgent,
              ]}>
                {msg.from === 'agent' && (
                  <Text style={styles.agentName}>Support Big-CIM</Text>
                )}
                <Text style={[
                  styles.bubbleText,
                  msg.from === 'user' ? styles.bubbleTextUser : styles.bubbleTextAgent,
                ]}>
                  {msg.content}
                </Text>
                <Text style={[
                  styles.bubbleTime,
                  msg.from === 'user' ? { color: 'rgba(255,255,255,0.6)' } : {},
                ]}>
                  {msg.time}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
        {thread.status !== 'Fermé' ? (
          <View style={styles.inputArea}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Votre message..."
                placeholderTextColor={Colors.textMuted}
                value={input}
                onChangeText={setInput}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]}
                onPress={sendMessage}
                activeOpacity={0.8}
                disabled={!input.trim()}
              >
                <Ionicons name="send" size={18} color={input.trim() ? '#fff' : Colors.textMuted} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.closedBanner}>
            <Ionicons name="lock-closed" size={14} color={Colors.textMuted} />
            <Text style={styles.closedText}>Cette conversation est fermée</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingTop: 52, paddingBottom: 14, paddingHorizontal: 16,
    backgroundColor: Colors.surface, borderBottomWidth: 1, borderBottomColor: Colors.divider,
  },
  backBtn: { width: 38, height: 38, borderRadius: 10, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  headerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  threadIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary },
  headerStatus: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 2 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  headerStatusText: { fontSize: 12, color: Colors.textMuted, fontWeight: '500' },
  menuBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' },
  infoBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: Colors.successLight, paddingVertical: 8,
  },
  infoText: { fontSize: 12, color: Colors.success, fontWeight: '500' },
  messagesList: { flex: 1 },
  messagesContent: { padding: 16, gap: 12 },
  messageRow: { flexDirection: 'row', gap: 8 },
  messageRowUser: { justifyContent: 'flex-end' },
  messageRowAgent: { justifyContent: 'flex-start' },
  agentAvatar: {
    width: 30, height: 30, borderRadius: 10,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, marginTop: 4,
  },
  bubble: { maxWidth: '78%', borderRadius: 18, padding: 14 },
  bubbleUser: { backgroundColor: Colors.primary, borderBottomRightRadius: 4 },
  bubbleAgent: { backgroundColor: Colors.surface, borderBottomLeftRadius: 4, shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.5, shadowRadius: 4, elevation: 2 },
  agentName: { fontSize: 11, fontWeight: '700', color: Colors.primary, marginBottom: 5 },
  bubbleText: { fontSize: 14, lineHeight: 21 },
  bubbleTextUser: { color: '#fff' },
  bubbleTextAgent: { color: Colors.textPrimary },
  bubbleTime: { fontSize: 10, color: Colors.textMuted, marginTop: 6, textAlign: 'right' },
  inputArea: {
    backgroundColor: Colors.surface, paddingHorizontal: 16, paddingVertical: 12,
    paddingBottom: 28, borderTopWidth: 1, borderTopColor: Colors.divider,
  },
  inputContainer: {
    flexDirection: 'row', alignItems: 'flex-end', gap: 10,
    backgroundColor: Colors.background, borderRadius: 20, padding: 8, paddingLeft: 16,
    borderWidth: 1.5, borderColor: Colors.border,
  },
  textInput: { flex: 1, fontSize: 14, color: Colors.textPrimary, maxHeight: 100, lineHeight: 20 },
  sendBtn: {
    width: 38, height: 38, borderRadius: 14,
    backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center',
  },
  sendBtnDisabled: { backgroundColor: Colors.divider },
  closedBanner: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    backgroundColor: Colors.divider, paddingVertical: 16,
  },
  closedText: { fontSize: 13, color: Colors.textMuted, fontWeight: '500' },
});
