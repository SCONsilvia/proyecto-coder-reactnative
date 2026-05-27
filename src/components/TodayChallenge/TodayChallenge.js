import { Text, ActivityIndicator, View, StyleSheet } from "react-native";
import { useTheme } from "../../constants/theme";

const TodayChallenge = ({ challenge, loading, error }) => {
    const { colors } = useTheme();

    if (loading) return <ActivityIndicator color = {colors.primary} />;

    if (error) return (                                       // ← nuevo caso
        <View style = {[styles.card, { backgroundColor: colors.surfaceVariant, borderColor: colors.error }]}>
            <Text style = {[styles.label, { color: colors.error }]}>Reto de hoy</Text>
            <Text style = {[styles.errorText, { color: colors.error }]}>
                No se pudo cargar el reto de hoy
            </Text>
        </View>
    );

    if (!challenge) return null;

    return (
        <View style = {[styles.card, { backgroundColor: colors.surfaceVariant, borderColor: colors.border }]}>
            <Text style = {[styles.label, { color: colors.muted }]}>Reto de hoy</Text>
            <Text style = {[styles.title, { color: colors.textPrimary }]}>{challenge.title}</Text>
        </View>
    );
};

export default TodayChallenge;

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        gap: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        textTransform: "uppercase",
        letterSpacing: 0.8,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
    },
    errorText: {
        fontSize: 14,
    },
});
