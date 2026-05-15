import { View, TextInput, Button, Text } from "react-native";
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
        <MainLayout>
            <Formik
                //Estado inicial del formulario.
                initialValues = {{ email: "", password: "" }}
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
                        />

                        {touched.email && errors.email && (
                        <Text>{errors.email}</Text>
                        )}

                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={values.password}
                            onChangeText={handleChange("password")}
                            onBlur={handleBlur("password")}
                            autoCapitalize="none"
                            autoCorrect={false}
                            textContentType="password"
                            autoComplete="password"
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
                            onPress={() => navigation.replace("Login")}
                        />

                    </View>
                )}
            </Formik>
        </MainLayout>
    );
};

export default RegisterScreen;
