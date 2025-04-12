import {TextInput} from "react-native-paper";
import {useState} from "react";

interface InputPros {
    label?: string,
    placeholder?: string,
    onChange?: (value: string) => void,
    color?: string,
    textColor?: string,
}




export const Input = ({label,color,textColor,placeholder}:InputPros) => {

    return (
        <TextInput
            style={{backgroundColor:color,width:"100%",height:60,marginBottom:25,alignSelf:"center"}}
            theme={{colors: { primary:textColor } }}
            mode="outlined"
            label={label}
            placeholder={placeholder}
        />
    );
};


export const SecureInput = ({label,color,textColor,placeholder}:InputPros) => {
    const [secure, setSecure] = useState(true);
    const toggleSecure = () => setSecure(!secure);
    return (
        <TextInput
            secureTextEntry={secure}
            style={{backgroundColor:color,width:"100%",height:60,marginBottom:25,alignSelf:"center"}}
            theme={{colors: { primary:textColor } }}
            mode="outlined"
            label={label}
            placeholder={placeholder}
            right={
                <TextInput.Icon
                    icon={secure ? 'eye-off' : 'eye'}
                    onPress={toggleSecure}
                    forceTextInputFocus={false}
                />
            }
        />
    );
};


export const EmailInput = ({ label, color, textColor, placeholder }: InputPros) => {
    return (
        <TextInput
            style={{
                backgroundColor: color,
                width: "100%",
                height: 60,
                marginBottom: 25,
                alignSelf: "center"
            }}
            theme={{ colors: { primary: textColor } }}
            mode="outlined"
            label={label}
            placeholder={placeholder}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
        />
    );
};

export const PhoneInput = ({ label, color, textColor, placeholder }: InputPros) => {
    return (
        <TextInput
            style={{
                backgroundColor: color,
                width: "100%",
                height: 60,
                marginBottom: 25,
                alignSelf: "center"
            }}
            theme={{ colors: { primary: textColor } }}
            mode="outlined"
            label={label}
            placeholder={placeholder}
            keyboardType="phone-pad"
            autoCapitalize="none"
            autoCorrect={false}
        />
    );
};