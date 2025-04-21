import * as React from 'react';
import { Appbar } from 'react-native-paper';

interface HeaderProps {
    title?: string;
    subtitle?: string;
    icon?: React.ReactNode;
    backButton?: ()=>void;
    onPress?: () => void;
}
export function HeaderWithText({ title, backButton }: HeaderProps) {
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={backButton} />
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}


export function HeaderWithButton({title,onPress}: HeaderProps) {
    return (
        <Appbar.Header style={{ backgroundColor: 'red' }}>
            <Appbar.Content
                title={title ?? ""}
                style={{ alignItems: 'flex-start' }} // 🔽 aligne le texte à gauche
                titleStyle={{ textAlign: 'left' }}   // 🔽 renforce le style du titre
            />
            <Appbar.Action icon={"account"} size={30} onPress={onPress} />
        </Appbar.Header>
    )
}


export function SimpleHeader({ title,onPress }: HeaderProps) {
    return (
        <Appbar.Header style={{ backgroundColor: 'white',borderBottomWidth:2,borderBottomColor:"lightgray" }}>
            <Appbar.BackAction  color={"black"} onPress={onPress} />
            <Appbar.Content titleStyle={{color:"black",}} title={title ?? ""} />

        </Appbar.Header>
    )
}


export function SimpleHeaderWithoutBorder({ title,onPress }: HeaderProps) {
    return (
        <Appbar.Header style={{ backgroundColor: 'white'}}>
            <Appbar.BackAction  color={"black"} onPress={onPress} />
            <Appbar.Content titleStyle={{color:"black",}} title={title ?? ""} />

        </Appbar.Header>
    )
}