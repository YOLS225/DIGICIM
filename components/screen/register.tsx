import { View, StyleSheet, Text } from "react-native";

import {HeaderWithText} from "@/components/widget/header/header-with-text";
import {EmailInput, Input} from "@/components/widget/input/simple-input";
import {CountryDropdown} from "@/components/widget/input/contry-input";
import {PhoneInputWithCountry} from "@/components/widget/input/phone-input";
import SimpleButton from "@/components/widget/buttons/simple-button";
import {ButtonText} from "@/components/widget/buttons/button-link";

export default function Register({ navigation: { navigate } }: any) {
    const goBack = () => navigate('Login');
    const goVerify = () => navigate('Verify');

    return (
        <>
            <HeaderWithText backButton={goBack} />

            <View style={styles.body}>
                <Text style={styles.title}>Création du compte</Text>
                <Text style={styles.subtitle}>
                    Remplissez le formulaire pour effectuer votre inscription
                </Text>

                <Input label="Votre Nom" color="white" placeholder="Kpalouazer" />
                <Input label="Votre Prénom" color="white" placeholder="IB" />
                <EmailInput label="Adresse e-mail" color="white" placeholder="yao@digilab.ci" />
                <CountryDropdown label="Sélectionnez votre pays" color="white" textColor="black" />
                <PhoneInputWithCountry
                    label="N° de téléphone"
                    color="white"
                    textColor="black"
                    placeholder="ex: 0707070707"
                />

                <SimpleButton
                    buttonText="Continuer"
                    buttonColor="red"
                    onPress={goVerify}
                />

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        gap: 5, // 🔽 réduit l'espace entre les champs
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingBottom: 2,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        marginBottom: 10,
        textAlign: "center",
    }
});
