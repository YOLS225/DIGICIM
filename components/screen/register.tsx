import { View, StyleSheet, Text } from "react-native";

import {HeaderWithText} from "@/components/widget/header/header-with-text";
import {EmailInput, Input, SecureInput} from "@/components/widget/input/simple-input";
import {CountryDropdown} from "@/components/widget/input/contry-input";
import {PhoneInputWithCountry} from "@/components/widget/input/phone-input";
import SimpleButton from "@/components/widget/buttons/simple-button";
import {UserFormData, userSchema} from "@/components/objects/schema";
import {Controller, useForm} from "react-hook-form";
import {RegisterForm, User} from "@/components/objects/interfaces";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {authService} from "@/components/objects/services";
import {zodResolver} from "@hookform/resolvers/zod";
import {showMessage} from "react-native-flash-message";



export default function Register({ navigation: { navigate } }: any) {
    const queryClient = useQueryClient();
    const {formState: {errors}, reset, getValues, handleSubmit,control} = useForm<UserFormData>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
        }
    })

    const mutation = useMutation({
        mutationFn: async (data: User) => {
            return await authService.createUser(data as RegisterForm);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["user","create"],
            })
            showMessage({
                message: "Succès",
                description: "Utilisateur créer avec success",
                type: "success",
            });
            navigate('Verify');

        },
        onError: () => {
            showMessage({
                message: "Échec",
                description: "Une erreur est survenue lors de la creation.",
                type: "danger",
            });

        },
    });

    const validForm = async () => {
        const values = getValues();
        const data = {...values};
        mutation.mutate(data)
        reset()
    }


    const goBack = () => navigate('Login');
    const goVerify = () => {
        navigate('Verify');
    }


    return (
        <>
            <HeaderWithText backButton={goBack} />

            <View style={styles.body}>
                <Text style={styles.title}>Création du compte</Text>
                <Text style={styles.subtitle}>
                    Remplissez le formulaire pour effectuer votre inscription
                </Text>

                <Controller
                    name={"lastName"}
                    control={control}
                    render={({field: {onChange, value}} )=>
                        <Input
                            label="Votre Nom"
                            color="white"
                            placeholder="Kpalouazer"
                            textColor={"black"}
                            value={value}
                            onChangeText={onChange}
                            error={errors.lastName?.message}
                        />
                    }
                />

                <Controller
                    name={"firstName"}
                    control={control}
                    render={({field: {onChange, value}} )=>
                        <Input
                            label="Votre Prénom"
                            color="white"
                            placeholder="IB"
                            textColor={"black"}
                            value={value}
                            onChangeText={onChange}
                            error={errors.firstName?.message}
                        />
                    }
                />

                <Controller
                    name={"email"}
                    control={control}
                    render={({field: {onChange, value}} )=>
                        <EmailInput
                            label="Adresse e-mail"
                            color="white"
                            placeholder="yao@digilab.ci"
                            textColor={"black"}
                            value={value}
                            onChangeText={onChange}
                            error={errors.email?.message}
                        />
                    }
                />

                <Controller
                    name={"phoneNumber"}
                    control={control}
                    render={({field: {onChange, value}} )=>
                        <PhoneInputWithCountry
                            label="N° de téléphone"
                            color="white"
                            textColor="black"
                            placeholder="ex: 0707070707"
                            onChange={onChange}
                            value={value}


                        />
                    }
                />

                <Controller
                    name={"password"}
                    control={control}
                    render={({field: {onChange, value}} )=>
                        <SecureInput
                            label="Votre Mot de passe"
                            color="white"
                            placeholder="IB"
                            textColor={"black"}
                            value={value}
                            onChangeText={onChange}
                            error={errors.password?.message}
                        />
                    }
                />



                {/*<EmailInput label="Adresse e-mail" color="white" placeholder="yao@digilab.ci" textColor={"black"}/>*/}
                {/*<CountryDropdown label="Sélectionnez votre pays" color="white" textColor="black" />*/}
                {/*<PhoneInputWithCountry*/}
                {/*    label="N° de téléphone"*/}
                {/*    color="white"*/}
                {/*    textColor="black"*/}
                {/*    placeholder="ex: 0707070707"*/}
                {/*/>*/}

                <SimpleButton
                    buttonText="Continuer"
                    buttonColor="red"
                    onPress={validForm}
                />

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        gap: 5,
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
        marginBottom: 10,
        textAlign: "center",
    }
});
