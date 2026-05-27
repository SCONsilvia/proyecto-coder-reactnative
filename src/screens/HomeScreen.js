import { View, Text, ScrollView, StyleSheet } from "react-native";
import MainLayout from "../layouts/MainLayout";
import TodayChallenge from "../components/TodayChallenge/TodayChallenge";
import ProgressCalendar from "../components/ProgressCalendar/ProgressCalendar";
import AppButton from "../components/UI/AppButton";
import { useTheme } from "../constants/theme";

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();

    return (
        <MainLayout>
            <ScrollView contentContainerStyle = {styles.scroll}>
                <Text style = {[styles.greeting, { color: colors.textPrimary }]}>
                    ¡Bienvenido! 👋
                </Text>
                <ProgressCalendar />
                <TodayChallenge />
                <AppButton
                    title = "Subir mi dibujo"
                    onPress = {() => navigation.navigate("Upload")}
                />
            </ScrollView>
        </MainLayout>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    scroll: {
        padding: 16,
        gap: 16,
        paddingBottom: 32,
    },
    greeting: {
        fontSize: 22,
        fontWeight: "700",
    },
});
