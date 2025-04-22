import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { CodeField, useClearByFocusCell } from 'react-native-confirmation-code-field';
import {user} from "@/components/objects/all-data_db";
import {showMessage} from "react-native-flash-message";


const CELL_COUNT = 4;

export default function PinCodeScreen({ navigation: { navigate } }: any) {

    const userInfo=user
    const [value, setValue] = useState('');
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue });

    const handleKeyPress = (key: string) => {
        if (key === 'DEL') {
            setValue(prev => prev.slice(0, -1));
        } else if (value.length < CELL_COUNT) {
            const newValue = value + key;
            setValue(newValue);
        }
    };

    useEffect(() => {
        if (value.length === CELL_COUNT) {
            if (value === userInfo?.pinCode) {
                showMessage({
                message: "Succès",
                description: "Code PIN correct.",
                type: "success",
                });
                navigate("Main")
            } else {
            showMessage({
            message: "Échec",
            description: "Code PIN incorrect.",
            type: "danger",
            });
                setValue('');
            }
        }
    }, [value,userInfo]);

    const keys = [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['', '0', 'DEL'],
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue {userInfo?.firstName} !</Text>
            <Text style={styles.subtitle}>Entrez un nouveau code secret</Text>
            <Text style={styles.subtitle}>validation ({userInfo?.pinCode})</Text>

            <CodeField
                {...props}
                value={value}
                onChangeText={() => {}}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                renderCell={({ index, symbol, isFocused }) => (
                    <Text
                        key={index}
                        style={[styles.cell, isFocused && styles.focusCell]}
                        onLayout={getCellOnLayoutHandler(index)}>
                        {symbol || ''}
                    </Text>
                )}
            />

            <View style={styles.keyboard}>
                {keys.map((row, rowIndex) => (
                    <View style={styles.row} key={rowIndex}>
                        {row.map((key, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.key, key === 'DEL' && styles.delKey]}
                                onPress={() => handleKeyPress(key)}
                                disabled={key === ''}>
                                <Text style={styles.keyText}>{key === 'DEL' ? '⌫' : key}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    title: { fontSize: 26, fontWeight: 'bold', paddingBottom: 2, textAlign: "center" },
    subtitle: { fontSize: 14, marginVertical: 10, textAlign: "center" },
    codeFieldRoot: { marginBottom: 30, justifyContent: 'center' },
    cell: {
        width: 40,
        height: 50,
        lineHeight: 48,
        fontSize: 24,
        borderWidth: 2,
        borderColor: '#ccc',
        textAlign: 'center',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    focusCell: { borderColor: '#000' },
    keyboard: { alignItems: 'center', justifyContent: 'center' },
    row: { flexDirection: 'row', marginVertical: 5 },
    key: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        alignContent:"space-between"
    },
    delKey: { backgroundColor: '#fdd' },
    keyText: { fontSize: 24, fontWeight: 'bold' },
});
