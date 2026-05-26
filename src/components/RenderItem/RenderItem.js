import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
};

// Memoriza el componente y evita renders innecesarios
//React.memo(Component) No vuelvas a renderizar este componente si sus props no cambiaron.
const RenderItem = React.memo(({ item }) => {
    //console.log("render item", item);
    
    const navigation = useNavigation();

    const openDetail = () => {
        navigation.navigate("GalleryDetail", {
            id: item.id
        });
    };

    return (
        <Pressable
            onPress={openDetail}
            style={[
                styles.card,
                item.isArchived === 1 && styles.archivedCard
            ]}
        >

            <Image
                source={{ uri: item.localUri }}
                style={styles.image}
            />

            {item.isArchived === 1 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                        Archived
                    </Text>
                </View>
            )}

            <Text>{formatDate(item.createdAt)}</Text>

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
    archivedCard: {
        borderWidth: 2,
        borderColor: "#D0D7DE",

        shadowOpacity: 0.05,
    },
    badge: {
        position: "absolute",
        top: 10,
        right: 10,

        backgroundColor: "rgba(0,0,0,0.7)",

        paddingHorizontal: 8,
        paddingVertical: 4,

        borderRadius: 999,
    },

    badgeText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "600",
    },
});

