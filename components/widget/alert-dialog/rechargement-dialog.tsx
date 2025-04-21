import React from 'react';
import { Button, Dialog, Portal, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';

type Props = {
    amount: string;
    phoneNumber: string;
    visible: boolean;
    onValid: () => void;
    onDismiss: () => void;
};

const RechargementDialog = ({ visible, amount, phoneNumber, onValid, onDismiss }: Props) => {
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
                <Dialog.Title style={styles.title}>
                    Voulez-vous recharger {amount} FCFA ?
                </Dialog.Title>
                <Dialog.Content>
                    <Text style={styles.subtitle}>
                        à partir du numéro : {phoneNumber}
                    </Text>
                </Dialog.Content>
                <Dialog.Actions style={styles.actions}>
                    <Button onPress={onDismiss} textColor="black">
                        Annuler
                    </Button>
                    <Button onPress={onValid} textColor="red">
                        Valider
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

export default RechargementDialog;

const styles = StyleSheet.create({
    dialog: {
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#000',
    },
    subtitle: {
        fontWeight: '300',
        fontSize: 16,
        color: '#333',
    },
    actions: {
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
    },
});
