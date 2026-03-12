import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, KeyboardAvoidingView,
  Platform, TouchableOpacity, StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Input, EmailInput, SecureInput } from '@/components/widget/input/simple-input';
import { PhoneInputWithCountry } from '@/components/widget/input/phone-input';
import SimpleButton from '@/components/widget/buttons/simple-button';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserFormData, userSchema } from '@/components/objects/schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '@/components/objects/services';
import { RegisterForm, User } from '@/components/objects/interfaces';
import { showMessage } from 'react-native-flash-message';

export default function Register({ navigation: { navigate } }: any) {
  const queryClient = useQueryClient();
  const { formState: { errors }, reset, getValues, handleSubmit, control } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: { firstName: '', lastName: '', email: '', phoneNumber: '', password: '' },
  });

  const mutation = useMutation({
    mutationFn: async (data: User) => authService.createUser(data as RegisterForm),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'create'] });
      showMessage({ message: 'Succès', description: 'Compte créé avec succès', type: 'success' });
      navigate('Verify');
    },
    onError: () => {
      showMessage({ message: 'Échec', description: 'Une erreur est survenue', type: 'danger' });
    },
  });

  const validForm = () => {
    const values = getValues();
    mutation.mutate({ ...values });
    reset();
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <StatusBar barStyle="dark-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => navigate('FirstScreen')} activeOpacity={0.7}>
          <Ionicons name="arrow-back" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.iconBadge}>
            <Ionicons name="person-add" size={24} color={Colors.primary} />
          </View>
          <Text style={styles.title}>Créer un compte</Text>
          <Text style={styles.subtitle}>Remplissez le formulaire pour rejoindre Big-CIM</Text>
        </View>

        {/* Steps indicator */}
        <View style={styles.steps}>
          <View style={[styles.step, styles.stepActive]} />
          <View style={styles.step} />
          <View style={styles.step} />
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Controller
            name="lastName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nom de famille"
                placeholder="Kpalouazer"
                value={value}
                onChangeText={onChange}
                error={errors.lastName?.message}
              />
            )}
          />
          <Controller
            name="firstName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                label="Prénom"
                placeholder="Ibrahim"
                value={value}
                onChangeText={onChange}
                error={errors.firstName?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <EmailInput
                label="Adresse e-mail"
                placeholder="exemple@email.com"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, value } }) => (
              <PhoneInputWithCountry
                label="Numéro de téléphone"
                color="white"
                textColor="black"
                placeholder="07 00 00 00 00"
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <SecureInput
                label="Mot de passe"
                placeholder="Minimum 6 caractères"
                value={value}
                onChangeText={onChange}
                error={errors.password?.message}
              />
            )}
          />
        </View>

        <SimpleButton
          buttonText="Continuer"
          buttonColor={Colors.primary}
          loading={mutation.isPending}
          onPress={() => navigate('Verify')}
        />

        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Vous avez déjà un compte ?</Text>
          <TouchableOpacity onPress={() => navigate('Login')} activeOpacity={0.7}>
            <Text style={styles.loginLink}> Se connecter</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  scroll: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  backBtn: {
    width: 42, height: 42, borderRadius: 12,
    backgroundColor: Colors.surface, alignItems: 'center', justifyContent: 'center',
    marginBottom: 32,
    shadowColor: Colors.shadow, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.6, shadowRadius: 4, elevation: 2,
  },
  header: { marginBottom: 24 },
  iconBadge: {
    width: 56, height: 56, borderRadius: 18,
    backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 20,
  },
  title: { fontSize: 30, fontWeight: '800', color: Colors.textPrimary, marginBottom: 10, letterSpacing: -0.5 },
  subtitle: { fontSize: 14, color: Colors.textSecondary, lineHeight: 21 },
  steps: { flexDirection: 'row', gap: 6, marginBottom: 28 },
  step: {
    flex: 1, height: 4, borderRadius: 4, backgroundColor: Colors.border,
  },
  stepActive: { backgroundColor: Colors.primary },
  form: { gap: 16, marginBottom: 8 },
  loginRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 24 },
  loginText: { fontSize: 14, color: Colors.textSecondary },
  loginLink: { fontSize: 14, color: Colors.primary, fontWeight: '700' },
});
