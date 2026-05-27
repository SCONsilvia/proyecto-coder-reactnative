import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../../constants/theme";

const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
};

// Memoriza el componente y evita renders innecesarios
//React.memo(Component) No vuelvas a renderizar este componente si sus props no cambiaron.
const RenderItem = React.memo(({ item }) => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    const openDetail = () => {
        navigation.navigate("GalleryDetail", { id: item.id });
    };

    return (
        <Pressable
            onPress = {openDetail}
            style = {[
                styles.card,
                { backgroundColor: colors.surface },
                item.isArchived === 1 && { borderWidth: 2, borderColor: colors.border },
            ]}
        >
            <Image 
                source = {{ uri: item.localUri }} 
                style = {styles.image} 
            />

            {item.isArchived === 1 && (
                <View style = {styles.badge}>
                    <Text style = {styles.badgeText}>
                        Archivado
                    </Text>
                </View>
            )}

            {item.syncStatus === "failed" && (
                <View style={[styles.badge, styles.badgeFailed]}>
                    <Text style={styles.badgeText}>Sin sync</Text>
                </View>
            )}

            <Text style = {[styles.date, { color: colors.muted }]}>
                {formatDate(item.createdAt)}
            </Text>
        </Pressable>
    );
});

export default RenderItem;

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 6,
        borderRadius: 14,
        overflow: "hidden",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
    badge: {
        position: "absolute",
        top: 8,
        right: 8,
        backgroundColor: "rgba(0,0,0,0.65)",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
    },
    badgeText: {
        color: "#fff",
        fontSize: 11,
        fontWeight: "600",
    },
    date: {
        fontSize: 11,
        textAlign: "center",
        paddingVertical: 6,
    },
    badgeFailed: {
        top: undefined,
        right: undefined,
        bottom: 8,
        left: 8,
        backgroundColor: "rgba(220, 38, 38, 0.85)",
    },
});
