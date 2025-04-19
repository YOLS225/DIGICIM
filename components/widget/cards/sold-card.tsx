import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Text, Button, IconButton } from 'react-native-paper';
import { Entypo } from "@expo/vector-icons";
import TransactionCard from "@/components/widget/cards/transaction-card";
import OperationsGrid from "@/components/widget/cards/operation-card";

const SoldeTotal = ({ navigation }: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const screenHeight = Dimensions.get('window').height;

    const transactions = [
        { label: 'Paiement Orange Money', amount: 2500 },
        { label: 'Achat MTN', amount: 3200 },
        { label: 'Transfert', amount: 5000 },
    ];

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
        >
            {/* Carte Solde */}
            <View style={styles.balanceContainer}>
                <Card style={styles.balanceCard}>
                    <Card.Content>
                        <View style={styles.header}>
                            <Entypo name="wallet" size={24} color="lightgray" />
                            <Text style={styles.title}>Solde total</Text>
                            <IconButton
                                icon={isVisible ? "eye-off" : "eye"}
                                size={24}
                                onPress={() => setIsVisible(!isVisible)}
                            />
                        </View>
                        <Text style={styles.balance}>
                            {isVisible ? "1 000 000 FCFA" : "••••••••••••••••••••"}
                        </Text>
                    </Card.Content>
                    <Card.Actions style={styles.cardActions}>
                        <Button
                            icon="store"
                            mode="contained"
                            style={styles.simulateButton}
                            labelStyle={styles.buttonLabel}
                        >
                            Simuler des achats
                        </Button>
                    </Card.Actions>
                </Card>
            </View>

            {/* Historique des transactions */}
            <TransactionCard data={transactions} />

            {/* Section Opérations */}
            <View style={styles.operationsContainer}>
                <Text style={styles.sectionTitle}>Opérations</Text>
                <OperationsGrid navigation={navigation} />
            </View>

            {/* Espace supplémentaire pour le défilement */}
            <View style={{ height: screenHeight * 0.1 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        paddingBottom: 20,
    },
    balanceContainer: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    balanceCard: {
        width: '100%',
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 10,
    },
    balance: {
        fontSize: 22,
        color: '#fff',
        textAlign: 'center',
        marginVertical: 15,
        fontWeight: '600',
    },
    cardActions: {
        borderTopWidth: 0.5,
        borderTopColor: '#333',
    },
    simulateButton: {
        flex: 1,
        borderRadius: 6,
        backgroundColor: '#333',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    buttonLabel: {
        color: 'lightgray',
    },
    operationsContainer: {
        paddingHorizontal: 20,
        marginTop: 25,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 15,
    },
});

export default SoldeTotal;