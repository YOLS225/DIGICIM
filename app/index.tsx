import { ImageBackground, StyleSheet, View, Text } from "react-native";
import FirstScreen from "@/components/screen/first-screen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "@/components/screen/login";
import Register from "@/components/screen/register";
const Stack = createNativeStackNavigator();



import { LogBox } from 'react-native';
import PhonenumberVerify from "@/components/screen/phonenumber-verify";
import PinCodeScreen from "@/components/screen/code-pin";
import {BottomTab} from "@/components/widget/bottom-tabs/bottom-tab";
import {ChooseMessage} from "@/components/screen/choose-message";
import {SendMessage} from "@/components/screen/send-message";
import Rechargement from "@/components/screen/rechargement";
import {ChooseFactory} from "@/components/screen/factories";
import ChooseCement from "@/components/screen/choose-cement";

LogBox.ignoreLogs([
    'Support for defaultProps will be removed',
]);

export default function Index(){
    return (
            <Stack.Navigator initialRouteName="FirstScreen">
                <Stack.Screen name="FirstScreen" component={FirstScreen} options={{headerShown:false}} />
                <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
                <Stack.Screen name="Register" component={Register} options={{headerShown:false}} />
                <Stack.Screen name="Verify" component={PhonenumberVerify} options={{headerShown:false}} />
                <Stack.Screen name="Pin" component={PinCodeScreen} options={{headerShown:false}} />
                <Stack.Screen name="Main" component={BottomTab} options={{headerShown:false}} />
                <Stack.Screen name="Choose" component={ChooseMessage} options={{headerShown:false}} />
                <Stack.Screen name="Send-message" component={SendMessage} options={{headerShown:false}} />
                <Stack.Screen name="Rechargement" component={Rechargement} options={{headerShown:false}} />
                <Stack.Screen name="Factories" component={ChooseFactory} options={{headerShown:false}} />
                <Stack.Screen name="Cement" component={ChooseCement} options={{headerShown:false}} />


            </Stack.Navigator>

    )
}
