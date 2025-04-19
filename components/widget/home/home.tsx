import {HeaderWithButton} from "@/components/widget/header/header-with-text";
import {View} from "react-native";
import SoldeTotal from "@/components/widget/cards/sold-card";
import * as React from "react";

export function Home() {
    return (
        <>
            <HeaderWithButton
                title={"Bonjour ,Yoann"}
            />
            <View style={{ flex: 1}}>
                <SoldeTotal/>
            </View>
        </>
    );
}