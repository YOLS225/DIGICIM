import {Card, Icon} from "react-native-paper";
import {Pressable} from "react-native";

interface CardMessageProps {
    title?: string,
    subtitle?: string,
    color?: string,
    top?: number,
    icon?: React.ReactNode,
    secondIcon?: React.ReactNode,
    image?: any,
    onPress?: () => void,
}

export const CardMessage = ({title,subtitle,color,top,icon,secondIcon,onPress}:CardMessageProps) => (
    <Pressable onPress={onPress}>
        <Card.Title style={{backgroundColor:color,marginTop:top,marginBottom:5}}
                    titleStyle={{color:"black",fontWeight:"bold",fontSize:16}}
                    title={title}
                    subtitleStyle={{color:"black",fontWeight:"light",fontSize:12}}
                    subtitle={subtitle}
                    right={() => icon }
                    left={() => secondIcon }
        />
    </Pressable>
);