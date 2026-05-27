import { Text, View, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Galeria from "../components/Galeria/Galeria";
import { useGalleryDrawings } from "../hooks/useGalleryDrawings";
import { useTheme } from "../constants/theme";

const GalleryScreen = () => {

    const [mode, setMode] = useState("active");

    const { items, loading } = useGalleryDrawings(mode);

    const { colors } = useTheme();

    const tabs = [
        { key: "active", label: "Galería" },
        { key: "archived", label: "Archivados" },
    ];

    return (
        <MainLayout>

            <View style = {styles.tabs}>
                {tabs.map((tab) => (
                    <Pressable
                        key = {tab.key}
                        style = {[
                            styles.tab,
                            { backgroundColor: colors.surfaceVariant, borderColor: colors.border },
                                mode === tab.key && { backgroundColor: colors.primary, borderColor: colors.primary },
                        ]}
                        onPress = {() => setMode(tab.key)}
                    >
                        <Text style = {[
                            styles.tabText,
                            { color: colors.textSecondary },
                            mode === tab.key && { color: "#FFFFFF" },
                        ]}>
                            {tab.label}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <Galeria items = {items} loading=  {loading} />

        </MainLayout>
    );
};

export default GalleryScreen;

const styles = StyleSheet.create({
    tabs: {
        flexDirection: "row",
        padding: 12,
        gap: 10,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: "center",
        borderWidth: 1,
    },
    tabText: {
        fontSize: 15,
        fontWeight: "600",
    },
});
