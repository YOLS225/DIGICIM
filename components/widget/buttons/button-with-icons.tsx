import {Button} from "react-native-paper";
import {StyleSheet, View} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {AntDesign} from "@expo/vector-icons";
import React from "react";

export interface ButtonProps{
    buttonText?: string;
    buttonColor?: string;
    icon?: React.ReactNode;
    onPress?: () => void;
}

export default function ButtonWithIcon({buttonText,buttonColor,icon,onPress}:ButtonProps){
    return(
        <Button
            style={styles.button}
            mode="contained"
            buttonColor={buttonColor}
            onPress={onPress}
            contentStyle={styles.buttonContent}
        >
            <View style={styles.buttonInner}>
                <ThemedText style={styles.buttonText}>{buttonText}</ThemedText>
                {icon}
            </View>
        </Button>
    )
}


const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        borderRadius: 4,
        padding:4,
        gap:4,
    },
    buttonContent: {
        position: 'relative',
        height: 50,
    },
    buttonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        position: 'relative',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },icon: {
        position: 'absolute',
        right: 10, // espace depuis le bord droit
    }
});