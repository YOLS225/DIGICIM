import React from 'react';
import { View, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderWithButton } from '@/components/widget/header/header-with-text';
import SoldeTotal from '@/components/widget/cards/sold-card';
import { user } from '@/components/objects/all-data_db';
import { Colors } from '@/constants/Colors';

export function Home({ navigation }: any) {
  const userInfo = user;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.surface} />
      <HeaderWithButton
        title={`${userInfo.firstName} ${userInfo.lastName}`}
        onPress={() => navigation.navigate('Profil')}
        rightAction={
          <TouchableOpacity
            style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate('Notifications')}
            activeOpacity={0.8}
          >
            <Ionicons name="notifications-outline" size={20} color={Colors.textPrimary} />
          </TouchableOpacity>
        }
      />
      <SoldeTotal navigation={navigation} />
    </View>
  );
}
