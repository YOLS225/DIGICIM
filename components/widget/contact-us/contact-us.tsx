import {Text, View,StyleSheet} from "react-native";
import * as React from "react";
import {SimpleHeader} from "@/components/widget/header/header-with-text";
import ButtonWithIcon from "@/components/widget/buttons/button-with-icons";
import {Ionicons} from "@expo/vector-icons";

export function ContactUs({ navigation: { navigate } }:any) {
    const goBack=()=>{
        navigate('Main');
    }

    const goNext=()=>{
        navigate('Choose');
    }

    return (
        <>
            <SimpleHeader
                title="Mes derniers messages"
                onPress={goBack}
            />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>En Developpement!</Text>
            </View>
            <View style={styles.buttonContainer}>
                <ButtonWithIcon
                    buttonText={"Nous contacter"}
                    buttonColor={"red"}
                    icon={<Ionicons name="chatbox-ellipses" style={{right:10, position:"absolute"}} size={24} color="white" />}
                    onPress={goNext}
                />
            </View>
        </>

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute', // Positionnement absolu pour le placer en bas à droite
        bottom: 20, // Ajustez la distance du bas
        right: 20, // Ajustez la distance de la droite
        width: 250, // Largeur du bouton
        borderRadius:100
    },
});



export function MessageContent(){
    return(
        <>
        </>
    )
}
