import { View, Text, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import MainLayout from "../layouts/MainLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { getFirebaseErrorMessage } from "../services/auth/firebaseErrors";
import { mapFirebaseErrorToField } from "../services/auth/firebaseErrorMapper";
import AppButton from "../components/UI/AppButton";
import AppInput from "../components/UI/AppInput";
import { useTheme } from "../constants/theme";
import { useRef } from "react";

const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),

    password: Yup.string()
        .required("La contraseña es obligatoria"),
});

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.user);
    const { colors } = useTheme();

    const passwordRef = useRef(null);

    const handleLogin = async (values, { setSubmitting, setFieldError }) => {
        try {
            if (loading) return;
            
            await dispatch(loginUser(values)).unwrap();

        } catch (errorCode) {

            const message = getFirebaseErrorMessage(errorCode);

            mapFirebaseErrorToField(
                errorCode, 
                (field) => setFieldError(field, message)
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <MainLayout top = {true}>
            <KeyboardAvoidingView
                style = {{ flex: 1 }}
                behavior = {Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle = {styles.scroll}
                    keyboardShouldPersistTaps = "handled"
                >
                    <Text style = {[styles.appName, { color: colors.primary }]}>DrawApp</Text>
                    <Text style = {[styles.subtitle, { color: colors.muted }]}>
                        Iniciá sesión para continuar
                    </Text>

                    <View style = {[styles.card, { backgroundColor: colors.surface, borderColor: colors.border}]}>
                        <Formik
                            initialValues = {{ email: "", password: "" }}
                            validationSchema = {loginValidationSchema}
                            onSubmit = {handleLogin}
                        >
                            {({ 
                                handleChange, 
                                handleSubmit, 
                                handleBlur, 
                                values, 
                                errors, 
                                touched 
                            }) => (
                                <View style = {styles.form}>

                                    <AppInput
                                        placeholder = "Email"
                                        value = {values.email}
                                        onChangeText = {handleChange("email")}
                                        onBlur = {handleBlur("email")}
                                        keyboardType = "email-address"
                                        autoCapitalize = "none"
                                        autoCorrect = {false}
                                        textContentType = "emailAddress"
                                        autoComplete = "email"
                                        returnKeyType = "next"
                                        blurOnSubmit = {false}
                                        onSubmitEditing = {() => passwordRef.current?.focus()}
                                    />

                                    {touched.email && errors.email && (
                                        <Text style = {[styles.error, { color: colors.error }]}>
                                            {errors.email}
                                        </Text>
                                    )}

                                    <AppInput
                                        ref = {passwordRef}
                                        placeholder = "Contraseña"
                                        secureTextEntry
                                        value = {values.password}
                                        onChangeText = {handleChange("password")}
                                        onBlur = {handleBlur("password")}
                                        autoCapitalize= "none"
                                        autoCorrect = {false}
                                        textContentType = "password"
                                        autoComplete = "password"
                                        returnKeyType = "done"
                                        blurOnSubmit = {false}
                                        onSubmitEditing = {handleSubmit}
                                    />

                                    {touched.password && errors.password && (
                                        <Text style = {[styles.error, { color: colors.error }]}>
                                            {errors.password}
                                        </Text>
                                    )}

                                    {errors.general && (
                                        <Text style = {[styles.error, { color: colors.error }]}>
                                            {errors.general}
                                        </Text>
                                    )}

                                    <AppButton
                                        title = {loading ? "Ingresando..." : "Iniciar sesión"}
                                        onPress = {handleSubmit}
                                        loading = {loading}
                                    />

                                    <AppButton
                                        title = "Crear cuenta"
                                        variant = "outline"
                                        onPress = {() => navigation.replace("Register")}
                                    />

                                </View>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </MainLayout>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
        gap: 8,
    },
    appName: {
        fontSize: 36,
        fontWeight: "800",
        textAlign: "center",
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 24,
    },
    card: {
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        elevation: 2,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
    },
    form: {
        gap: 12,
    },
    error: {
        fontSize: 13,
        marginTop: -4,
    },
});
