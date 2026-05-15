import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";

import { Formik } from "formik";
import * as Yup from "yup";

import { getFirebaseErrorMessage } from "../services/auth/firebaseErrors";
import { mapFirebaseErrorToField } from "../services/auth/firebaseErrorMapper";

const registerValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),

    password: Yup.string()
        .required("La contraseña es obligatoria"),
});


const LoginScreen = ({navigation}) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { loading, error } = useSelector(
        state => state.user
    );

    const handleLogin = async (
                values,
                { setSubmitting, setFieldError }
            ) => {
                try {
                    if (loading) return; // doble protección
        
                    await dispatch(loginUser(values)).unwrap();
        
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
            onSubmit = {handleLogin}
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

                    {errors.general && (
                        <Text style={{ color: "red" }}>
                            {errors.general}
                        </Text>
                    )}

                    <Button title={loading  ? "Ingresando..." : "Login"} onPress={handleSubmit} disabled={loading }/>
                    {/* handleSubmit
                        Formik:
                        valida con Yup
                        si pasa → ejecuta onSubmit*/}

                    <Button
                        title="Crear cuenta"
                        onPress={() => navigation.navigate("Register")}
                    />

                </View>
            )}
        </Formik>
    );
}

export default LoginScreen;
