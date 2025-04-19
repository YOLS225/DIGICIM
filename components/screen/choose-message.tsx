import {SimpleHeader} from "@/components/widget/header/header-with-text";
import {StyleSheet, Text, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import * as React from "react";
import {CardMessage} from "@/components/widget/cards/message-card";

export function ChooseMessage({ navigation: { navigate } }: any) {
    const goBack = () => {
        navigate('Main');
    };

    const goNext = () => {
        navigate('Send-message');
    };

    return (
        <View style={styles.screen}>
            <SimpleHeader title="Nouveau message" onPress={goBack} />

            <View style={styles.container}>
                <Text style={styles.title}>Quel est le thème de votre message ?</Text>

                <View style={styles.cardsContainer}>
                    <CardMessage
                        title={"ACHAT"}
                        subtitle={"Envoyez un message concernant votre achat"}
                        color={"#F8F8F8"}
                        icon={<AntDesign name="caretright" size={24} color="black" />}
                        onPress={() => navigate('Send-message', { name: 'ACHAT' })}
                    />
                    <CardMessage
                        title={"RECHARGEMENT"}
                        subtitle={"Envoyez un message sur votre rechargement"}
                        color={"#F8F8F8"}
                        icon={<AntDesign name="caretright" size={24} color="black" />}
                        onPress={() => navigate('Send-message', { name: 'RECHARGEMENT' })}
                    />
                    <CardMessage
                        title={"QUESTION"}
                        subtitle={"Envoyez un message si vous avez des questions "}
                        color={"#F8F8F8"}
                        icon={<AntDesign name="caretright" size={24} color="black" />}
                        onPress={() => navigate('Send-message', { name: 'QUESTION' })}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        gap: 16,
        paddingTop: 15,
    },
    title: {
        fontSize: 16,
        fontWeight: '300',
        color: 'black',
    },
    cardsContainer: {
        gap: 16,
        marginTop: 20,
    },
});
