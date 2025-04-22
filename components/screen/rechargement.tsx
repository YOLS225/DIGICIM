import React, {useRef, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    ScrollView, TouchableWithoutFeedback, Keyboard
} from "react-native";
import {SimpleHeaderWithoutBorder} from "@/components/widget/header/header-with-text";
import AmountInput from "@/components/widget/input/amount-input";
import SimpleButton from "@/components/widget/buttons/simple-button";
import RechargementDialog from "@/components/widget/alert-dialog/rechargement-dialog";
import {showMessage} from "react-native-flash-message";
import {ActivityIndicator} from "react-native-paper";



export default function Rechargement({ navigation: { navigate } }: any) {
    const [loading, setLoading] = useState(false);
    const [amount, setAmount] = useState<string>('');
    const [dialogVisible, setDialogVisible] = useState(false);
    const goBack = () => {
        navigate("Main");
    };
    const randomResult = () => {
        const result = Math.random() < 0.5;
        if (result) {
            showMessage({
                message: "Succès 🎉",
                description: "Rechargement effectué avec succès.",
                type: "success",
            });
            navigate("Main");
        } else {
            showMessage({
                message: "Échec ❌",
                description: "Une erreur est survenue lors du rechargement.",
                type: "danger",
            });
            setAmount("")
        }
    };


    const handleAmountChange = (text: string) => {
        const filtered = text.replace(/[^0-9]/g, '');
        setAmount(filtered);
    };

    const handleConfirm = () => {
        setDialogVisible(true);
    };

    const handleDismiss = () => {
        setDialogVisible(false);
    };

    const handleValidation = () => {
        setDialogVisible(false);
        setLoading(true);

        setTimeout(() => {
            randomResult();
            setLoading(false);
        }, 1000);
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={styles.scroll}
                    keyboardShouldPersistTaps="handled"
                >
                    <SimpleHeaderWithoutBorder title={"Se recharger"} onPress={goBack} />

                    <View style={styles.container}>
                        <Text style={styles.title}>Numéro à débiter</Text>
                        <Text style={styles.subtitle}>2250700757873</Text>

                        <AmountInput
                            value={amount}
                            onChangeText={handleAmountChange}
                            currency="FCFA"
                        />
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.row}>
                            <Text style={styles.label}>Montant à recevoir</Text>
                            <Text style={styles.amount}>{amount || '0'} FCFA</Text>
                        </View>
                        <SimpleButton
                            buttonText="Confirmer"
                            buttonColor="red"
                            inactive={!amount}
                            onPress={handleConfirm}
                        />
                        <RechargementDialog
                            amount={amount}
                            phoneNumber={"0700757873"}
                            visible={dialogVisible}
                            onValid={handleValidation}
                            onDismiss={handleDismiss}
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
            {loading && (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator size="large" color="red" />
                </View>
            )}
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
    },
    container: {
        gap: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: '300',
        color: 'black',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    label: {
        fontSize: 16,
        color: 'red',
        fontWeight: '500',
    },
    amount: {
        fontSize: 16,
        color: 'red',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 'auto',
        gap: 12,
    },
    spinnerContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.6)',
    }
});
