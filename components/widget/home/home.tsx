import {HeaderWithButton} from "@/components/widget/header/header-with-text";
import {View} from "react-native";
import SoldeTotal from "@/components/widget/cards/sold-card";
import * as React from "react";

export function Home({ navigation }: any) {
    return (
        <>
            <HeaderWithButton
                title={"Bonjour ,Yoann"}
            />
            <View style={{ flex: 1}}>
                <SoldeTotal navigation={navigation }/>
            </View>
        </>
    );
}