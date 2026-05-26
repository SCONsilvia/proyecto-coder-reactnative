import MainLayout from "../layouts/MainLayout";

import {
    Text,
    View,
    Pressable,
    StyleSheet,
} from "react-native";

import { useState } from "react";

import Galeria from "../components/Galeria/Galeria";
import { useGalleryDrawings } from "../hooks/useGalleryDrawings";

const GalleryScreen = () => {

    const [mode, setMode] = useState("active");
    
    const { items, loading } = useGalleryDrawings(mode);

    return(
        <MainLayout>

            <View style={styles.tabs}>

                <Pressable
                    style={[
                        styles.tab,
                        mode === "active" && styles.activeTab
                    ]}
                    onPress={() => setMode("active")}
                >
                    <Text>Gallery</Text>
                </Pressable>

                <Pressable
                    style={[
                        styles.tab,
                        mode === "archived" && styles.activeTab
                    ]}
                    onPress={() => setMode("archived")}
                >
                    <Text>Archived</Text>
                </Pressable>

            </View>

            <Galeria
                items={items}
                loading={loading}
            />

        </MainLayout>
    )
}

export default GalleryScreen;

const styles = StyleSheet.create({

    tabs: {
        flexDirection: "row",
        padding: 10,
        gap: 10,
    },

    tab: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 10,
        backgroundColor: "#DDD",
    },

    activeTab: {
        backgroundColor: "#B8D8FF",
    },

});
