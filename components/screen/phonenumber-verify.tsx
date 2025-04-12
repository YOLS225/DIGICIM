import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {HeaderWithText} from "@/components/widget/header/header-with-text";
import OtpInput from "@/components/widget/input/otp-input";
import SimpleButton from "@/components/widget/buttons/simple-button";


export default function PhonenumberVerify({ navigation: { navigate } }: any) {
    const goBack = () => navigate('FirstScreen');
    const handleCodeFilled = (code: string) => {
        Alert.alert('Code saisi', code);
        // Appelle ton API ici
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <HeaderWithText backButton={goBack} />

                    <View style={styles.body}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>Vérification du numéro</Text>
                            <Text style={styles.title}>de téléphone</Text>
                            <Text style={styles.subtitle}>
                                Veuillez saisir le code qui vous a été envoyé
                            </Text>

                            <OtpInput codeLength={6} onCodeFilled={handleCodeFilled} />
                        </View>

                        <View style={{ marginTop: 'auto' }}>
                            <SimpleButton
                                buttonText="Valider le code"
                                buttonColor="red"
                                onPress={() => console.log("valider le code")}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        paddingBottom: 2,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 14,
        marginVertical: 10,
        textAlign: "center",
    }
});
