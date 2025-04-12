import * as React from 'react';
import { Appbar } from 'react-native-paper';

interface HeaderProps {
    title?: string;
    icon?: React.ReactNode;
    backButton?: ()=>void;
}
export function HeaderWithText({ title, backButton }: HeaderProps) {
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={backButton} />
            <Appbar.Content title={title} />
        </Appbar.Header>
    )
}