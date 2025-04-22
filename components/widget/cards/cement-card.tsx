import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card, Button, Text } from 'react-native-paper';

const ProductCard = () => {
    const url="https://media.istockphoto.com/id/476199756/photo/cement-bags-pile.jpg?s=1024x1024&w=is&k=20&c=EvgvCeTipBiAOQAlUHsaikhQCp0c3aIvlBAyzeJrLAc="
    return (
        <Card style={styles.card}>
            <Card.Content>
                <Image
                    source={{ uri: url }} // Remplacez par l'URL de l'image
                    style={styles.image}
                />
                <Text style={styles.title}>CPJ 42,5 (N) - 1T</Text>
                <Text style={styles.price}>85 000 TTC</Text>
            </Card.Content>
            <Card.Actions>
                <Button mode="contained" style={styles.button}>
                    Ajouter
                </Button>
            </Card.Actions>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        borderRadius: 8,
        elevation: 3,
        height:"auto",
        width:"45%",
    },
    image: {
        width: '100%',
        height: 120,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
    },
    price: {
        fontSize: 16,
        color: 'grey',
        marginTop: 4,
    },
    button: {
        backgroundColor: 'red',
    },
});

export default ProductCard;