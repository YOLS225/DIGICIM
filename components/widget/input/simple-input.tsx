import {TextInput,Text} from "react-native-paper";
import {useState} from "react";

interface InputPros {
    label?: string,
    placeholder?: string,
    onChange?: (value: string) => void,
    color?: string,
    textColor?: string,
    error?: string;
    value?: string;
    onChangeText?: (text: string) => void;

}




export const Input = ({label,color,textColor,placeholder,error,value,onChangeText}:InputPros) => {

    return (
        <>
            <TextInput
                style={{backgroundColor:color,width:"100%",height:60,marginBottom:25,alignSelf:"center"}}
                theme={{colors: { primary:textColor } }}
                mode="outlined"
                label={label}
                placeholder={placeholder}
                value={value}
                error={!!error}
                onChangeText={onChangeText}
            />
            {error && <Text style={{color:'red',marginBottom:15,marginLeft:5}}>{error}</Text>}
        </>
    );
};


export const SecureInput = ({label,color,textColor,placeholder,error,value,onChangeText}:InputPros) => {
    const [secure, setSecure] = useState(true);
    const toggleSecure = () => setSecure(!secure);
    return (
       <>
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
               onChangeText={onChangeText}
               value={value}
               error={!!error}
           />
           {error && <Text style={{color:'red',marginBottom:15,marginLeft:5}}>{error}</Text>}
       </>
    );
};


export const EmailInput = ({ label, color, textColor, placeholder,error,value,onChangeText }: InputPros) => {
    return (
        <>
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
                // autoCorrect={false}
                value={value}
                error={!!error}
                onChangeText={onChangeText}
            />
            {error && <Text style={{color:'red',marginBottom:15,marginLeft:5}}>{error}</Text>}
        </>
    );
};

export const PhoneInput = ({ label, color, textColor, placeholder,error,value }: InputPros) => {
    return (
        <>
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
                value={value}
                error={!!error}
            />
            {error && <Text style={{color:'red',marginBottom:15,marginLeft:5}}>{error}</Text>}
        </>
    );
};