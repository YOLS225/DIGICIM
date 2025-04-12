import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";


function Paye() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>En Developpement!</Text>
        </View>
    );
}

function Consulte() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>En Developpement!</Text>
        </View>
    );
}

function Historik() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>En Developpement!</Text>
        </View>
    );
}

function Statistik() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>En Developpement!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export function BottomTab() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "blue", // Couleur des icônes actives
                tabBarInactiveTintColor: "gray",
                headerShown:false,
            }}

        >
            <Tab.Screen
                name="Accueil"
                component={Paye}
                options={{
                    tabBarLabel: 'Accueil',
                    tabBarIcon: () => (
                        <AntDesign name="home" size={24} color="black" />
                    )
                }}
            />
            <Tab.Screen
                name="Payer"
                component={Consulte}
                options={{
                    tabBarLabel: 'Nous contacter',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="phone-message" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Historik"
                component={Historik}
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: () => (
                        <MaterialCommunityIcons name="account" size={24} color="black" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


