import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

// Memoriza el componente y evita renders innecesarios
//React.memo(Component) No vuelvas a renderizar este componente si sus props no cambiaron.
const RenderItem = React.memo(({ item }) => {
    console.log("render item", item);
    
    const navigation = useNavigation();

    const openDetail = () => {
        navigation.navigate("GalleryDetail", {
            id: item.id
        });
    };

    return (
        <Pressable onPress = {openDetail} style = {styles.card}>
            <Image
                source = {{ uri: item.localUri }}
                style = {styles.image}
            />
            <Text>{item.createdAt}</Text>
        </Pressable >
    );
});

export default RenderItem;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 6,
        borderRadius: 14,
        overflow: "hidden",

        backgroundColor: "#fff",

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },

    image: {
        width: "100%",
        aspectRatio: 1,//imagenes cuadradas automaticamente
    },
});

/*
🟡 Nivel 3 (PRO)

Tap en imagen →

👉 abre pantalla detalle.

🟡 Nivel 4 (🔥 APP SERIA)

Long press:

borrar
editar
favorito
🔵 Nivel 5 (WOW)

Header arriba:

Drawing Diary
You drew 48 times this month ✨

Esto crea apego emocional.

*/
