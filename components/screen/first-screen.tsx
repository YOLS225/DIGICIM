import React, {useEffect} from 'react';
import { Card} from 'react-native-paper';
import { Dimensions, Image, StyleSheet, View,Text } from 'react-native';
import {AntDesign} from "@expo/vector-icons";
import ButtonWithIcon from "@/components/widget/buttons/button-with-icons";
import SimpleButton from "@/components/widget/buttons/simple-button";

const { width, height } = Dimensions.get('window');

export default function FirstScreen({ navigation: { navigate } }:any) {
    const imgsrc = 'https://plus.unsplash.com/premium_photo-1661952448084-c8ff11cc973f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

    const goLogin=()=>{
        navigate('Login');
    }
    const goRegister=()=>{
        navigate('Register');
    }

    useEffect(() => {

    }, [imgsrc]);


    return (
        <Card style={styles.card}>
            <Image source={{ uri: imgsrc }} style={styles.cover} resizeMode="cover" />
            <View style={styles.contentContainer}>
                <Card.Content>
                    <Text style={styles.text}>Commandez et gérez</Text>
                    <Text style={styles.text}>Votre ciment</Text>
                    <Text style={styles.text}>plus facilement</Text>
                </Card.Content>

                <SimpleButton
                    buttonText={"Accéder à mon compte"}
                    buttonColor="red"
                    onPress={goLogin}
                />

                <ButtonWithIcon
                    buttonText={"Ouvrir un compte"}
                    buttonColor="gray"
                    icon={<AntDesign name="arrowright" style={styles.icon} size={18} color="white" />}
                    onPress={goRegister}
                />


            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    card: {
        height: height,
        width: width,
        flex: 1,
        backgroundColor: 'white',
    },
    cover: {
        height: height * 0.60,
        width: "100%",
        marginBottom: 10,
    },
    contentContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    text: {
        marginTop: 10,
        color: 'black',
        fontSize: 26,
        fontWeight: 'bold',
    },
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
