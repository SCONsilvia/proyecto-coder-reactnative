import React, { useState } from "react";
import {
    View,
    Text,
    Button,
    StyleSheet,
    Alert,
} from "react-native";

import {
    resendVerificationEmail,
    checkEmailVerification,
    logoutUser
} from "../features/auth/authThunks";

import { auth } from "../services/firebase/firebaseApp";

import { useDispatch } from "react-redux";

export default function EmailVerificationScreen({ navigation }) {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)

    // Reenviar email
    const resendEmail = async () => {
        try {
            await dispatch(resendVerificationEmail()).unwrap();
            Alert.alert("Correo reenviado ✅");
        } catch(err) {
            Alert.alert("Error", "No se pudo reenviar el correo. Intentá más tarde.");
        }
    };

    //Ya verifiqué
    const checkVerification = async () => {
        setLoading(true);

        try {
            const verified =
                await dispatch(checkEmailVerification()).unwrap();
                
            if (verified) {
                Alert.alert("Email verificado 🎉");
            } else {
                Alert.alert("Aún no está verificado");
            }

        } catch(err) {
            Alert.alert("Error", err);
        } finally {
            // 👇 SIEMPRE se ejecuta
            setLoading(false);
        }
    };

    // 🔙 Volver al login (RESET)
    const goToLogin = async () => {
        dispatch(logoutUser());
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>
            Verifica tu correo 📩
        </Text>

        <Text style={styles.text}>
            Te enviamos un enlace de verificación.
            Abre tu correo y luego presiona:
        </Text>

        <Button
            title="Ya verifiqué"
            onPress={checkVerification}
            disabled={loading}
        />

        <View style={{ height: 10 }} />

        <Button
            title="Reenviar correo"
            onPress={resendEmail}
        />

        <View style={{ height: 20 }} />

        <Button
            title="Volver al Login"
            color="red"
            onPress={goToLogin}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    text: {
        textAlign: "center",
        marginBottom: 30,
    },
});