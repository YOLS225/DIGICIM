import {ThemedText} from "@/components/ThemedText";
import { ImageBackground, StyleSheet, View, Text } from "react-native";
import {Colors} from "@/constants/Colors";
import FirstScreen from "@/components/screen/first-screen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "@/components/screen/login";
import Register from "@/components/screen/register";
const Stack = createNativeStackNavigator();



import { LogBox } from 'react-native';
import PhonenumberVerify from "@/components/screen/phonenumber-verify";

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
                {/*<Stack.Screen name="PaymentMode" component={PaymentMode} options={{headerShown:false}} />*/}
            </Stack.Navigator>

    )
}




const styles=StyleSheet.create({
    body:{
        flex:1
    }
})