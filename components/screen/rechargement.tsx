import {StyleSheet, View,Text} from "react-native";
import {SimpleHeader} from "@/components/widget/header/header-with-text";
import * as React from "react";

export default function Rechargement() {
    const goBack = () => {}
    return (
        <View style={styles.screen}>
            <SimpleHeader onPress={goBack} />
            <View>
                <Text>Numéro à débiter</Text>
                <Text>2250700757873</Text>

            </View>
        </View>
    )
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
