import { LogBox, View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/context/AuthContext';
import { Colors } from '@/constants/Colors';

// Auth
import FirstScreen from '@/components/screen/first-screen';
import Login from '@/components/screen/login';
import Register from '@/components/screen/register';
import PhonenumberVerify from '@/components/screen/phonenumber-verify';
import PinCodeScreen from '@/components/screen/code-pin';
import PinSetup from '@/components/screen/pin-setup';

// Main
import { BottomTab } from '@/components/widget/bottom-tabs/bottom-tab';

// Messages
import { ChooseMessage } from '@/components/screen/choose-message';
import { SendMessage } from '@/components/screen/send-message';
import MessageDetail from '@/components/screen/message-detail';

// Recharge
import Rechargement from '@/components/screen/rechargement';

// Commandes
import { ChooseFactory } from '@/components/screen/factories';
import ChooseCement from '@/components/screen/choose-cement';
import Cart from '@/components/screen/cart';
import Orders from '@/components/screen/orders';
import OrderDetail from '@/components/screen/order-detail';
import OrderConfirmation from '@/components/screen/order-confirmation';

// Autres
import Offers from '@/components/screen/offers';
import Notifications from '@/components/screen/notifications';
import TransactionHistory from '@/components/screen/transaction-history';
import EditProfile from '@/components/screen/edit-profile';

LogBox.ignoreLogs(['Support for defaultProps will be removed']);

const Stack = createNativeStackNavigator();

export default function Index() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const initialRoute = user ? 'Pin' : 'FirstScreen';

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      {/* ── AUTH ── */}
      <Stack.Screen name="FirstScreen"     component={FirstScreen}       options={{ headerShown: false }} />
      <Stack.Screen name="Login"           component={Login}             options={{ headerShown: false }} />
      <Stack.Screen name="Register"        component={Register}          options={{ headerShown: false }} />
      <Stack.Screen name="Verify"          component={PhonenumberVerify} options={{ headerShown: false }} />
      <Stack.Screen name="Pin"             component={PinCodeScreen}     options={{ headerShown: false }} />
      <Stack.Screen name="PinSetup"        component={PinSetup}          options={{ headerShown: false }} />

      {/* ── MAIN ── */}
      <Stack.Screen name="Main"            component={BottomTab}         options={{ headerShown: false }} />

      {/* ── MESSAGES ── */}
      <Stack.Screen name="Choose"          component={ChooseMessage}     options={{ headerShown: false }} />
      <Stack.Screen name="Send-message"    component={SendMessage}       options={{ headerShown: false }} />
      <Stack.Screen name="MessageDetail"   component={MessageDetail}     options={{ headerShown: false }} />

      {/* ── RECHARGE ── */}
      <Stack.Screen name="Rechargement"    component={Rechargement}      options={{ headerShown: false }} />
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} options={{ headerShown: false }} />

      {/* ── COMMANDES ── */}
      <Stack.Screen name="Factories"       component={ChooseFactory}     options={{ headerShown: false }} />
      <Stack.Screen name="Cement"          component={ChooseCement}      options={{ headerShown: false }} />
      <Stack.Screen name="Cart"            component={Cart}              options={{ headerShown: false }} />
      <Stack.Screen name="Orders"          component={Orders}            options={{ headerShown: false }} />
      <Stack.Screen name="OrderDetail"     component={OrderDetail}       options={{ headerShown: false }} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} options={{ headerShown: false }} />

      {/* ── DIVERS ── */}
      <Stack.Screen name="Offers"          component={Offers}            options={{ headerShown: false }} />
      <Stack.Screen name="Notifications"   component={Notifications}     options={{ headerShown: false }} />
      <Stack.Screen name="EditProfile"     component={EditProfile}       options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
