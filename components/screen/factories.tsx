import {SimpleHeader} from "@/components/widget/header/header-with-text";
import {StyleSheet, Text, View} from "react-native";
import {AntDesign, EvilIcons} from "@expo/vector-icons";
import * as React from "react";
import {CardMessage} from "@/components/widget/cards/message-card";
import SimpleSearchBar from "@/components/widget/input/search-bar";

export function ChooseFactory({ navigation: { navigate } }: any) {
    const goBack = () => {
        navigate('Main');
    };

    const goNext = () => {
        navigate('Send-message');
    };

    return (
        <View style={styles.screen}>
            <SimpleHeader title="Choisir un site" onPress={goBack} />

            <View style={styles.container}>
                <Text style={styles.title}>Veuillez choisir une localisation</Text>
                <View>
                    <SimpleSearchBar
                        onSearchBarChange={()=>{}}
                        placeholder={"Rechercher"}
                        value={""}
                    />
                </View>

                <View style={styles.cardsContainer}>
                    <CardMessage
                        title={"Usine Angré"}
                        color={"red"}
                        secondIcon={<EvilIcons name="location" size={24} color="white" />}
                        icon={<AntDesign name="caretright" size={24} color="white" />}
                        onPress={() => navigate('Cement')}
                    />
                    <CardMessage
                        title={"Usine Yakro"}
                        color={"red"}
                        secondIcon={<EvilIcons name="location" size={24} color="white" />}
                        icon={<AntDesign name="caretright" size={24} color="white" />}
                        onPress={() => navigate('Send-message', { name: 'RECHARGEMENT' })}
                    />
                    <CardMessage
                        title={"Usine Bouaké"}
                        color={"red"}
                        secondIcon={<EvilIcons name="location" size={24} color="white" />}
                        icon={<AntDesign name="caretright" size={24} color="white" />}
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
