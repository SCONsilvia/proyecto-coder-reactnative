import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { resendVerificationEmail, checkEmailVerification, logoutUser } from "../features/auth/authThunks";
import { useDispatch } from "react-redux";
import MainLayout from "../layouts/MainLayout";
import AppButton from "../components/UI/AppButton";
import { useTheme } from "../constants/theme";

export default function EmailVerificationScreen() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { colors } = useTheme();

    const resendEmail = async () => {
        try {
            await dispatch(resendVerificationEmail()).unwrap();
            Alert.alert("Correo reenviado ✅");
        } catch {
            Alert.alert("Error", "No se pudo reenviar el correo. Intentá más tarde.");
        }
    };

    const checkVerification = async () => {
        setLoading(true);
        try {
            const verified = await dispatch(checkEmailVerification()).unwrap();
            Alert.alert(verified ? "Email verificado 🎉" : "Aún no está verificado");
        } catch (err) {
            Alert.alert("Error", String(err));
        } finally {
            setLoading(false);
        }
    };

    return (
        <MainLayout>
            <View style = {styles.container}>
                <Text style = {styles.icon}>📩</Text>
                <Text style = {[styles.title, { color: colors.textPrimary }]}>
                    Verificá tu correo
                </Text>
                <Text style = {[styles.text, { color: colors.textSecondary }]}>
                    Te enviamos un enlace de verificación. Abrí tu correo y luego presioná el botón.
                </Text>

                <View style = {styles.actions}>
                    <AppButton
                        title = "Ya verifiqué"
                        onPress = {checkVerification}
                        loading = {loading}
                    />
                    <AppButton
                        title = "Reenviar correo"
                        variant = "outline"
                        onPress = {resendEmail}
                    />
                    <AppButton
                        title = "Volver al Login"
                        variant = "danger"
                        onPress = {() => dispatch(logoutUser())}
                    />
                </View>
            </View>
        </MainLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        gap: 12,
    },
    icon: {
        fontSize: 52,
        textAlign: "center",
    },
    title: {
        fontSize: 26,
        fontWeight: "700",
        textAlign: "center",
    },
    text: {
        fontSize: 16,
        textAlign: "center",
        lineHeight: 24,
        marginBottom: 8,
    },
    actions: {
        gap: 12,
        marginTop: 8,
    },
});
