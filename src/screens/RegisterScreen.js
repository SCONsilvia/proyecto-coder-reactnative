import { View, Text, KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { useRef } from "react";
import { registerUser } from "../features/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import { getFirebaseErrorMessage } from "../services/auth/firebaseErrors";
import { mapFirebaseErrorToField } from "../services/auth/firebaseErrorMapper";
import AppButton from "../components/UI/AppButton";
import AppInput from "../components/UI/AppInput";
import { useTheme } from "../constants/theme";

const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),

    password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("La contraseña es obligatoria"),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
        .required("Confirmá la contraseña"),
});

const RegisterScreen = ({ navigation }) => {

    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.user);
    const { colors } = useTheme();
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const handleRegister = async (values, { setSubmitting, setFieldError }) => {
        try {
            if (loading) return;

            const { confirmPassword, ...userData } = values;

            await dispatch(registerUser(userData)).unwrap();

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
        <MainLayout>
            <KeyboardAvoidingView
                style = {{ flex: 1 }}
                behavior = {Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle = {styles.scroll}
                    keyboardShouldPersistTaps = "handled"
                    keyboardDismissMode = "on-drag"
                >
                    <Text style = {[styles.appName, { color: colors.primary }]}>Crear cuenta</Text>
                    <Text style = {[styles.subtitle, { color: colors.muted }]}>
                        Completá tus datos para registrarte
                    </Text>

                    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border}]}>
                        <Formik
                            initialValues = {{ email: "", password: "", confirmPassword: "" }}
                            validationSchema = {registerValidationSchema}
                            onSubmit = {handleRegister}
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
                                        autoCapitalize="none"
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
                                        autoCapitalize = "none"
                                        autoCorrect = {false}
                                        textContentType = "password"
                                        autoComplete = "password"
                                        returnKeyType = "next"
                                        blurOnSubmit = {false}
                                        onSubmitEditing = {() => confirmPasswordRef.current?.focus()}
                                    />
                                    {touched.password && errors.password && (
                                        <Text style = {[styles.error, { color: colors.error }]}>
                                            {errors.password}
                                        </Text>
                                    )}

                                    <AppInput
                                        ref = {confirmPasswordRef}
                                        placeholder = "Confirmar contraseña"
                                        secureTextEntry
                                        value = {values.confirmPassword}
                                        onChangeText = {handleChange("confirmPassword")}
                                        onBlur = {handleBlur("confirmPassword")}
                                        autoCapitalize = "none"
                                        autoCorrect = {false}
                                        autoComplete = "password"
                                        textContentType = "newPassword"
                                        returnKeyType = "done"
                                        blurOnSubmit = {false}
                                        onSubmitEditing = {handleSubmit}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <Text style = {[styles.error, { color: colors.error }]}>
                                            {errors.confirmPassword}
                                        </Text>
                                    )}

                                    <AppButton
                                        title = {loading ? "Registrando..." : "Crear cuenta"}
                                        onPress = {handleSubmit}
                                        loading = {loading}
                                    />

                                    <AppButton
                                        title = "Ya tengo cuenta"
                                        variant = "outline"
                                        onPress = {() => navigation.replace("Login")}
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

export default RegisterScreen;

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 24,
        gap: 8,
    },
    appName: {
        fontSize: 30,
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
