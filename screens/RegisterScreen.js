import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { registerUser } from "../features/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";

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
});

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const { loading, error } = useSelector(
        state => state.user
    );    

    const handleRegister = async (
        values,
        { setSubmitting, setFieldError }
    ) => {
        try {
            if (loading) return; // doble protección
            await dispatch(registerUser(values)).unwrap();

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
        <Formik
            //Estado inicial del formulario.
            initialValues = {{ email: "", password: "" }}
            validationSchema = {registerValidationSchema}
            onSubmit = {handleRegister}
        >
            {({
                handleChange,
                handleSubmit,
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
                    />

                    {touched.email && errors.email && (
                    <Text>{errors.email}</Text>
                    )}

                    <TextInput
                        placeholder="Password"
                        secureTextEntry
                        value={values.password}
                        onChangeText={handleChange("password")}
                    />

                    {touched.password && errors.password && (
                        <Text>{errors.password}</Text>
                    )}

                    <Button title={loading  ? "Registrando..." : "Register"}  onPress={handleSubmit} disabled={loading } />
                    {/* handleSubmit
                        Formik:
                        valida con Yup
                        si pasa → ejecuta onSubmit*/}

                    <Button
                        title="Already have account?"
                        onPress={() => navigation.navigate("Login")}
                    />

                </View>
            )}
        </Formik>
    );
};

export default RegisterScreen;

/*
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";

import { Formik } from "formik";
import * as Yup from "yup";

const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),

    password: Yup.string()
        .min(6, "Mínimo 6 caracteres")
        .required("La contraseña es obligatoria"),
});


const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { loading, error } = useSelector(
        state => state.user
    );

    const handleLogin = async () => {
        dispatch(
            loginUser({ email, password })
        );
    };

    return (
        <View>
            <TextInput
                placeholder = "Email"
                onChangeText = {setEmail}
            />
            {error && <Text>{error}</Text>}

            <TextInput
                placeholder = "Password"
                secureTextEntry
                onChangeText = {setPassword}
            />

            {error && <Text>{error}</Text>}

            <Button
                title={loading ? "Entrando..." : "Login"}
                onPress={handleLogin}
                disabled={loading}
            />
            <Button
                title="Crear cuenta"
                onPress={() => navigation.navigate("Register")}
            />
        </View>
    );
}

export default LoginScreen;*/
