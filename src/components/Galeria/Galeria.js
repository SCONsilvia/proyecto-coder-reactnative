import { View, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useCallback } from "react";
import { useWindowDimensions } from "react-native";
import RenderItem from "../RenderItem/RenderItem";
import { useTheme } from "../../constants/theme";

const Galeria = ({ items, loading, onRefresh, refreshing }) => {
    const { width } = useWindowDimensions();

    const { colors } = useTheme();

    const ITEM_SIZE = 180;//ancho mínimo estimado por ítem para calcular cuántas columnas entran
    const numColumns = Math.min(
        5, 
        Math.max(2, Math.floor(width / ITEM_SIZE))
    );

    //useCallback evita recrear renderItem en cada render, mejorando performance en listas grandes 
    const renderItem = useCallback(
        ({ item }) => <RenderItem item={item} />,
        []
    );

    if (loading && items.length === 0) {
        return <ActivityIndicator size = "large" color = {colors.primary} style = {{ marginTop: 40 }} />;
    }

    return (
        <View style = {[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data = {items}
                renderItem = {renderItem}
                keyExtractor = {(item)  => item.id.toString()}
                numColumns = {numColumns}
                key = {numColumns}
                contentContainerStyle = {styles.list}
                columnWrapperStyle = {styles.row}
                initialNumToRender = {6}
                maxToRenderPerBatch = {5}
                windowSize = {7}
                removeClippedSubviews = {true}
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
        </View>
    );
};

export default Galeria;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        padding: 10,
    },
    row: {
        justifyContent: "space-between",
    },
});
