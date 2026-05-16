import { View, TextInput, Button, Text, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useRef } from "react";
import { registerUser } from "../features/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";

//Formik maneja formularios, se encatga de guardar valores, manejar cambios, manejar submit, manejar errores, saber si tocaste un input, evitar useState por campo o sea que reemplaza esto useState onChangeText handleSubmit manual
import { Formik } from "formik";

//Yup valida datos, sirve para decir email debe ser valido password minimo 6 catacteres
import * as Yup from "yup";

import { getFirebaseErrorMessage } from "../services/auth/firebaseErrors";
import { mapFirebaseErrorToField } from "../services/auth/firebaseErrorMapper";

const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),

    password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("La contraseña es obligatoria"),

    confirmPassword: Yup.string()
        .oneOf(
            [Yup.ref("password")],
            "Las contraseñas no coinciden"
        )
        .required("Confirmá la contraseña"),
});

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const { loading, error } = useSelector(
        state => state.user
    );    

    const handleRegister = async (
        values,
        { setSubmitting, setFieldError }
    ) => {
        try {
            if (loading) return; // doble protección

            const { confirmPassword, ...userData } = values;

            await dispatch(registerUser(userData)).unwrap();

        } catch (errorCode) {

            const message =
                getFirebaseErrorMessage(errorCode);

            mapFirebaseErrorToField(
                errorCode,
                (field) => setFieldError(field, message)
            );
        }
        finally {
            setSubmitting(false);
        }
    };

    return (
        <MainLayout>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={{   
                        flexGrow: 1,
                        justifyContent: "center",
                        padding: 20 
                    }}
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                >
                    <Formik
                        //Estado inicial del formulario.
                        initialValues = {{ email: "", password: "", confirmPassword: "" }}
                        validationSchema = {registerValidationSchema}
                        onSubmit = {handleRegister}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            handleBlur,
                            values,
                            //Errores que devuelve Yup.
                            errors,
                            // touched Solo muestra error si el usuario tocó el input.
                            touched,
                        }) => (
                            <View>

                                <TextInput
                                    placeholder="Email"
                                    value={values.email}
                                    //handleChange("email") ✅ actualiza values.email ✅ marca campo como cambiado
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="emailAddress"
                                    autoComplete="email"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => passwordRef.current?.focus() }
                                />

                                {touched.email && errors.email && (
                                <Text>{errors.email}</Text>
                                )}

                                <TextInput
                                    ref={passwordRef}
                                    placeholder="Password"
                                    secureTextEntry
                                    value={values.password}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    textContentType="password"
                                    autoComplete="password"
                                    returnKeyType="next"
                                    blurOnSubmit={false}
                                    onSubmitEditing={() => confirmPasswordRef.current?.focus() }
                                />

                                {touched.password && errors.password && (
                                    <Text>{errors.password}</Text>
                                )}
                                
                                <TextInput
                                    ref={confirmPasswordRef}
                                    placeholder="Confirmar contraseña"
                                    secureTextEntry
                                    value={values.confirmPassword}
                                    onChangeText={handleChange("confirmPassword")}
                                    onBlur={handleBlur("confirmPassword")}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    autoComplete="password"
                                    textContentType="newPassword"
                                    returnKeyType="done"
                                    blurOnSubmit={false}
                                    onSubmitEditing={handleSubmit}
                                />

                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text>{errors.confirmPassword}</Text>
                                )}

                                <Button title={loading  ? "Registrando..." : "Registrar"}  onPress={handleSubmit} disabled={loading } />
                                {/* handleSubmit
                                    Formik:
                                    valida con Yup
                                    si pasa → ejecuta onSubmit*/}

                                <Button
                                    title="Already have account?"
                                    onPress={() => navigation.replace("Login")}
                                />

                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
        </MainLayout>
    );
};

export default RegisterScreen;
