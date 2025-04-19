import {SimpleHeader} from "@/components/widget/header/header-with-text";
import {StyleSheet, Text, View} from "react-native";
import * as React from "react";
import {SendAchatMessage} from "@/components/widget/message-forms/achat-form";
import {SendRechargementMessage} from "@/components/widget/message-forms/rechargement-form";
import {SendQuestionMessage} from "@/components/widget/message-forms/question-form";

export function SendMessage({ route,navigation: { navigate } }: any) {
    const { name } = route.params;
    const goBack = () => {
        navigate('Choose');
    };


    const renderForm = () => {
        switch (name) {
            case 'ACHAT':
                return <SendAchatMessage />;
            case 'RECHARGEMENT':
                return <SendRechargementMessage />;
            case 'QUESTION':
                return <SendQuestionMessage />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.screen}>
            <SimpleHeader title="Nouveau message" onPress={goBack} />

            <View style={styles.container}>
                <View style={styles.cardsContainer}>
                    {renderForm()}
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

