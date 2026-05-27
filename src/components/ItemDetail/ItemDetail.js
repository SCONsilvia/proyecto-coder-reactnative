import { Text, View, Image, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDrawing } from "../../services/database/drawingService";
import { drawingChanged } from "../../features/drawings/drawingsSlice";
import DrawingForm from "../DrawingForm/DrawingForm";
import AppButton from "../UI/AppButton";
import { useTheme } from "../../constants/theme";

const InfoRow = ({ label, value, colors }) => (
    <View style = {[styles.row, { borderColor: colors.border }]}>
        <Text style = {[styles.rowLabel, { color: colors.muted }]}>{label}</Text>
        <Text style = {[styles.rowValue, { color: colors.textPrimary }]}>{String(value)}</Text>
    </View>
);

const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
};

const ItemDetail = ({ item }) => {
    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();

    const { colors } = useTheme();

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState(item.title || "");
    const [description, setDescription] = useState(item.description || "");

    const handleSave = async () => {
        setLoading(true);
        try {
            await updateDrawing({ id: item.id, title, description, isArchived: item.isArchived }, uid);
            dispatch(drawingChanged());
            setEditing(false);
        } finally {
            setLoading(false);
        }
    };

    const handleArchive = async () => {
        setLoading(true);
        try {
            await updateDrawing({
                id: item.id,
                title: item.title,
                description: item.description,
                isArchived: !item.isArchived,
            }, uid);
            dispatch(drawingChanged());
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            <Image
                source = {{ uri: item.localUri }}
                style = {[styles.image, { backgroundColor: colors.surfaceVariant }]}
                resizeMode = "contain"
            />

            <View style = {[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>

                {!editing ? (
                    <>
                        <Text style = {[styles.title, { color: colors.textPrimary }]}>{item.title}</Text>
                        <Text style = {[styles.description, { color: colors.textSecondary }]}>
                            {item.description}
                        </Text>
                        <AppButton
                            title = "Editar"
                            variant = "outline"
                            onPress = {()  => setEditing(true)}
                            disabled = {loading}
                        />
                    </>
                ) : (
                    <DrawingForm
                        title = {title}
                        setTitle = {setTitle}
                        description = {description}
                        setDescription = {setDescription}
                        loading = {loading}
                        onSubmit = {handleSave}
                        buttonTitle = "Guardar cambios"
                    />
                )}

                <InfoRow label = "Estado" value = {item.status} colors = {colors} />
                <InfoRow label = "Archivado" value = {item.isArchived ? "Sí" : "No"} colors = {colors} />
                <InfoRow label = "Creado" value = {formatDate(item.createdAt)} colors = {colors} />

            </View>

            <AppButton
                title = {item.isArchived ? "Desarchivar" : "Archivar"}
                variant = {item.isArchived ? "outline" : "danger"}
                onPress = {handleArchive}
                disabled = {loading}
                loading = {loading}
            />

        </ScrollView>
    );
};

export default ItemDetail;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
        paddingBottom: 32,
    },
    image: {
        width: "100%",
        height: 320,
        borderRadius: 12,
    },
    card: {
        borderRadius: 12,
        padding: 16,
        gap: 12,
        borderWidth: 1,
        elevation: 1,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
    },
    description: {
        fontSize: 16,
        lineHeight: 22,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        paddingVertical: 8,
    },
    rowLabel: {
        fontWeight: "500",
        fontSize: 14,
    },
    rowValue: {
        fontWeight: "600",
        fontSize: 14,
    },
});
