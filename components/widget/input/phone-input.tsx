import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';

type PhoneInputProps = {
    label: string;
    color: string; // backgroundColor
    value?: string;
    textColor: string;   // couleur du texte
    placeholder: string;
    onChange?: (value: string) => void;
};

export const PhoneInputWithCountry = ({ label, color, textColor, placeholder,value,onChange }: PhoneInputProps) => {
    const phoneInputRef = useRef<PhoneInput>(null);


    return (
        <View style={styles.wrapper}>
            <Text style={[styles.label, { color: textColor }]}>{label}</Text>
            <PhoneInput
                ref={phoneInputRef}
                value={value}
                defaultCode="CI"
                layout="first"
                onChangeText={onChange}
                // onChangeFormattedText={text => setFormattedValue(text)}
                containerStyle={[styles.phoneContainer, { backgroundColor: color, borderColor: 'gray' }]}
                textContainerStyle={[styles.textInput, { backgroundColor: color }]}
                textInputStyle={[styles.textInputStyle, { color: textColor }]}
                codeTextStyle={[styles.codeTextStyle, { color: textColor }]}
                placeholder={placeholder}
                withShadow={false}
                autoFocus={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        marginBottom: 25,
        alignSelf: 'center',
    },
    label: {
        fontSize: 14,
        marginBottom: 5,
    },
    phoneContainer: {
        width: '100%',
        height: 60,
        borderRadius: 4,
        borderWidth: 1,
    },
    textInput: {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        paddingVertical: 0,
    },
    textInputStyle: {
        fontSize: 16,
        padding: 0,
        margin: 0,
    },
    codeTextStyle: {
        fontSize: 16,
    },
});
