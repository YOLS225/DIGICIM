import {HeaderWithButton} from "@/components/widget/header/header-with-text";
import {View} from "react-native";
import SoldeTotal from "@/components/widget/cards/sold-card";
import * as React from "react";
import {user} from "@/components/objects/all-data_db";
import {useEffect} from "react";

export function Home({ navigation }: any) {
    const userInfo= user
    useEffect(() => {

    }, [userInfo]);
    return (
        <>
            <HeaderWithButton
                title={`Bonjour,${userInfo.firstName} ${userInfo.lastName} !`}
            />
            <View style={{ flex: 1}}>
                <SoldeTotal navigation={navigation }/>
            </View>
        </>
    );
}