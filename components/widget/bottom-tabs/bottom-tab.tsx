import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";
import {HeaderWithButton} from "@/components/widget/header/header-with-text";
import SoldeTotal from "@/components/widget/cards/sold-card";
import FloatingButton from "@/components/widget/buttons/floating-button";
import {Home} from "@/components/widget/home/home";
import {ContactUs} from "@/components/widget/contact-us/contact-us";
import {Profil} from "@/components/widget/profil/profil";







const Tab = createBottomTabNavigator();

export function BottomTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "red", // Couleur des icônes actives
                tabBarInactiveTintColor: "gray",
                headerShown:false,
            }}

        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: 'Accueil',
                    tabBarIcon: ({size,color}) => (
                        <AntDesign name="home" size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen
                name="Contact-us"
                component={ContactUs}
                options={{
                    tabBarLabel: 'Nous contacter',
                    tabBarIcon: ({size,color}) => (
                        <MaterialCommunityIcons name="phone-message" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profil"
                component={Profil}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({size,color}) => (
                        <MaterialCommunityIcons name="account" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


