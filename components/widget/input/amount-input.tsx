import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

type AmountInputProps = {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    currency?: string; // ex: "FCFA"
};

const AmountInput = ({
                         value,
                         onChangeText,
                         placeholder = "Entrez le montant",
                         currency = "FCFA",
                     }: AmountInputProps) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType="numeric"
                style={styles.input}
                placeholderTextColor="#aaa"
            />
            <Text style={styles.currency}>{currency}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: 'white',
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    currency: {
        position: 'absolute',
        right: 20,
        fontSize: 24,
        color: 'black',
        fontWeight: 'light',
    },
    input: {
        marginRight:25,
        fontSize: 26,
        color: 'red',
        fontWeight: '600',
        textAlign: 'center',
        width: '100%'
    }
});

export default AmountInput;
