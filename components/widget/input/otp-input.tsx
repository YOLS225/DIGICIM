import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface OtpInputProps {
    codeLength?: number;
    onCodeFilled?: (code: string) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ codeLength = 4, onCodeFilled }) => {
    const [code, setCode] = useState<string[]>(Array(codeLength).fill(''));
    const inputs = useRef<Array<TextInput | null>>([]);

    const handleChange = (text: string, index: number) => {
        if (!/^\d?$/.test(text)) return;

        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < codeLength - 1) {
            inputs.current[index + 1]?.focus();
        }

        if (newCode.every(char => char !== '') && onCodeFilled) {
            onCodeFilled(newCode.join(''));
        }
    };

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            {code.map((value, index) => (
                <TextInput
                    key={index}
                    ref={ref => (inputs.current[index] = ref)}
                    value={value}
                    onChangeText={text => handleChange(text, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={styles.input}
                />
            ))}
        </View>
    );
};

export default OtpInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        marginVertical: 20,
    },
    input: {
        width: 45,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#ccc',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#fff',
    },
});
