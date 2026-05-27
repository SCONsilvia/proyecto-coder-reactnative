//Configuración de header compartida por todos los stacks: usa el componente Header personalizado
import Header from "../components/Header/Header";

export const defaultHeader = {
    header: ({ navigation, back, options }) => (
        <Header
        title = {options.headerTitle}
        onBack = {back ? () => navigation.goBack() : null}
        rightIcon = {options.headerRight?.()}
        />
    ),
};