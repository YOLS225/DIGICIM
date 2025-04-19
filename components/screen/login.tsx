import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

import {HeaderWithText} from "@/components/widget/header/header-with-text";
import {Input, PhoneInput, SecureInput} from "@/components/widget/input/simple-input";
import {ButtonText} from "@/components/widget/buttons/button-link";
import SimpleButton from "@/components/widget/buttons/simple-button";
import {goBack} from "expo-router/build/global-state/routing";
import {PhoneInputWithCountry} from "@/components/widget/input/phone-input";

export default function Login({ navigation: { navigate } }:any) {
    const goBack=()=>{
        navigate('FirstScreen');
    }

    const goRegister=()=>{
        navigate('Register');
    }

    const goHome=()=>{
        navigate('Pin');
    }

    return (
        <>
            <View>
                <HeaderWithText backButton={goBack} />
            </View>

            <View style={styles.body}>
                <Text style={styles.title}>Connexion à votre</Text>
                <Text style={styles.title}>Compte</Text>

                <Text style={styles.subtitle}>
                    Entrez vos identifiants pour vous connecter
                </Text>

                <PhoneInputWithCountry
                    label="N° de téléphone"
                    color="white"
                    textColor="black"
                    placeholder="ex: 0707070707"
                />

                <View>
                    <SecureInput
                        label={"Mot de passe"}
                        color={"white"}
                        placeholder={'Password'}
                    />
                    <View style={styles.forgotContainer}>
                        <ButtonText
                            buttonText={"Mot de passe oublié?"}
                            textColor={"black"}
                            onPress={() => {}}
                        />
                    </View>
                </View>

                <SimpleButton
                    buttonText={"Connexion"}
                    buttonColor="red"
                    onPress={goHome}
                />

                <Text style={{ marginTop: 15,fontWeight:"bold",fontSize:17,textAlign:"center" }}>
                    Première connexion à l'application ?
                </Text>

                <ButtonText
                    buttonText={"Ouvrir mon compte"}
                    textColor={"black"}
                    onPress={goRegister}
                />
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        gap: 15,
        padding: 30,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingBottom: 2,
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    forgotContainer: {
        alignSelf: 'flex-end',
        marginTop: -15,
        marginBottom: 10,
    },
});
