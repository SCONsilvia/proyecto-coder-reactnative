import { View, Text, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { useState, useCallback } from "react";
import MainLayout from "../layouts/MainLayout";
import TodayChallenge from "../components/TodayChallenge/TodayChallenge";
import ProgressCalendar from "../components/ProgressCalendar/ProgressCalendar";
import AppButton from "../components/UI/AppButton";
import { useTheme } from "../constants/theme";
import { useTodayChallenge } from "../hooks/useTodayChallenge";

const HomeScreen = ({ navigation }) => {
    const { colors } = useTheme();
    const { challenge, loading, refresh: refreshChallenge, error: challengeError } = useTodayChallenge();
    const [refreshing, setRefreshing] = useState(false);
    const [calendarKey, setCalendarKey] = useState(0);

    const handleRefresh = useCallback(async () => {
        setRefreshing(true);
        await refreshChallenge();
        setCalendarKey(k => k + 1);
        setRefreshing(false);
    }, [refreshChallenge]);

    return (
        <MainLayout>
            <ScrollView
                contentContainerStyle = {styles.scroll}
                refreshControl = {
                    <RefreshControl
                        refreshing = {refreshing}
                        onRefresh = {handleRefresh}
                        tintColor = {colors.primary}
                    />
                }
            >
                <Text style = {[styles.greeting, { color: colors.textPrimary }]}>
                    ¡Bienvenido! 👋
                </Text>
                <ProgressCalendar refreshKey = {calendarKey} />
                <TodayChallenge challenge = {challenge} loading = {loading} error = {challengeError}/>
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
