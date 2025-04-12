import {Pressable} from "react-native";
import {Button} from "react-native-paper";

interface Props {
  buttonText: string,
  textColor?: string,
  color?: string,
  onPress?: () => void,
}

export function ButtonText({ buttonText, textColor, color, onPress }:Props) {
    return (
        <Pressable>
            <Button
                style={{ backgroundColor: color, width: "100%", borderColor: color, marginBottom: 20, }}
                icon=""
                mode="contained"
                onPress={onPress}
                labelStyle={{ color: textColor,textAlign:'center',fontSize:17,fontWeight:"bold" }}
            >
                {buttonText}
            </Button>
        </Pressable>
    );
}