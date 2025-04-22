import {ScrollView, StyleSheet, Text, View} from "react-native";
import {SimpleHeader} from "@/components/widget/header/header-with-text";
import SimpleSearchBar from "@/components/widget/input/search-bar";
import * as React from "react";
import ProductCard from "@/components/widget/cards/cement-card";
import SimpleButton from "@/components/widget/buttons/simple-button";

export default function ChooseCement({ navigation: { navigate } }: any){
    const goBack = () => {
        navigate('Factories');
    };
    return (
        <View style={styles.screen}>
            <SimpleHeader title="Effectuer un achat" onPress={goBack} />

            <ScrollView style={styles.container}>
                <View>
                    <Text style={styles.title}>Mettez un produit dans votre panier pour continuer</Text>
                    {/*<AntDesign name="delete" size={24} color="black" />*/}
                </View>

                <View>
                    <SimpleSearchBar
                        onSearchBarChange={()=>{}}
                        placeholder={"Rechercher"}
                        value={""}
                    />
                </View>

                <View style={styles.row}>
                    <ProductCard/>
                    <ProductCard/>
                </View>
                <View style={styles.row}>
                    <ProductCard/>
                    <ProductCard/>
                </View>
                <View style={styles.footer}>
                    <SimpleButton
                        buttonText={"Continuer"}
                        buttonColor="red"
                        onPress={()=>{}}
                        // inactive={true}
                    />
                </View>

            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        paddingVertical: 10,
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
    row: {
        flexDirection: 'row',
        marginBottom: 15, // Espace entre les lignes si nécessaire
    },
    footer: {
        marginTop: 'auto',
        gap: 12,
        marginBottom:25
    },
});