import * as React from 'react';

import {TextInput} from "react-native-paper";
import {View} from "react-native";

interface SimpleInputProps {
    label?: string,
    placeholder?: string,
    value?: string,
    onChange?: (value: string |undefined) => void,
}

const SimpleInput = ({label,placeholder,value,onChange}:SimpleInputProps) => {
    return (
        <TextInput
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            style={{ backgroundColor: 'white' }}
            textColor="black"
            // outlineColor="black"
            // activeOutlineColor="black"
            activeUnderlineColor="black"
        />
    );
};

const SimpleInputDisable = ({label,value}:SimpleInputProps) => {
    return (
        <View>
            <TextInput
                label={label}
                value={value}
                readOnly={true}
                style={{ backgroundColor: 'white' }}
                textColor="black"
                outlineColor="black"
                activeOutlineColor="black"
            />
        </View>

    );
};

const TextAreaInput = ({label,placeholder,value,onChange}:SimpleInputProps) => {
    return (
        <TextInput
            label={label}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            style={{ backgroundColor: 'white',textAlignVertical: 'top' }}
            multiline={true}
            numberOfLines={5}
            textColor="black"
            // outlineColor="black"
            // activeOutlineColor="black"
            activeUnderlineColor="black"

        />
    );
};



export default SimpleInput;
export  {SimpleInputDisable,TextAreaInput};

