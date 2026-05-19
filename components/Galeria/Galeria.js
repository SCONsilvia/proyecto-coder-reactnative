import { Text, View, Button, Image, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { getUserDrawings } from "../../services/database/drawingService";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import RenderItem from "../RenderItem/RenderItem";
import { useWindowDimensions } from "react-native";

const Galeria = () => {

    const uid = useSelector(state => state.user.uid);
    const version = useSelector(state => state.drawings.version);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const { width } = useWindowDimensions();
    const ITEM_SIZE = 180;//cada imagen medira aprox 180px
    const numColumns = Math.min( 5, Math.max(2, Math.floor(width / ITEM_SIZE)) );

    useEffect(() => {
        const loadDrawings = async () => {
            setLoading(true);

            const resp = await getUserDrawings(uid);
            setItems(resp);

            setLoading(false);
        };

        loadDrawings();
    },[uid, version])
    
    //Memoriza la función renderItem
    //const renderItem = useCallback(fn, []); React, reutilizá esta función mientras sus dependencias no cambien.
    const renderItem = useCallback(
        ({ item }) => <RenderItem item = {item} />,
        []
    );

    if (loading) return <ActivityIndicator size="large" />
    
    return(
        <View style = {styles.container}>
            <FlatList 
                data = {items}
                renderItem = {renderItem}
                keyExtractor = {(item) => item.id.toString()}//identificador unico
                numColumns = {numColumns}//modo grid
                key = {numColumns}//cuando cambia numColumns FlatList recrea la lista completa
                contentContainerStyle = {styles.list}//estilo de contenido interno sirve para padding, espacio superior/ inferior, centrar contenido
                columnWrapperStyle = {styles.row}//estulo para cada fila solo funciona cuando numColumns > 1 Ej 
                initialNumToRender = {6}//cuantos items renderizar al inicial
                maxToRenderPerBatch = {5}//cuantos items nuevos renderiza por lote aca va de 5 en 5
                windowSize = {7}//cuantas pantallas se mantienen montadas 3 up 1 visible 3 down
                removeClippedSubviews = {true} //los elementos fuera de pantalla se desmontan del arbol nativo
            />
        </View>
    )
}

export default Galeria;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F4F6F8",
    },

    list: {
        padding: 10,
    },

    row: {
        justifyContent: "space-between",
    },
});
