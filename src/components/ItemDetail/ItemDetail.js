import {
    Text,
    View,
    Image,
    ActivityIndicator,
    StyleSheet,
    ScrollView,
    Button
} from "react-native";

const InfoRow = ({ label, value }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
};

import { useSelector, useDispatch } from "react-redux";
import { updateDrawing } from "../../services/database/drawingService";
import { drawingChanged } from "../../features/drawings/drawingsSlice";

const ItemDetail = ({ item }) => {
    const dispatch = useDispatch()

    const uid = useSelector(state => state.user.uid);

    const archiva = async () => {
        const data = {
            id : item.id,
            title: "alaaa",
            description : "nueva",
            isArchived : 0,
        }
        const resp = await updateDrawing(data, uid);
        dispatch(drawingChanged());
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* Imagen */}
            <Image
                source={{ uri: item.localUri }}
                style={styles.image}
                resizeMode="contain"
            />

            {/* Información */}
            <View style={styles.infoContainer}>

                <Text style={styles.description}>
                    {item.title}
                </Text>

                <Text style={styles.description}>
                    {item.description}
                </Text>

                <InfoRow label="Estado" value={item.status} />

                <InfoRow
                    label="Estado pendiente"
                    value={item.pendingAction}
                />

                <InfoRow
                    label="Resolución"
                    value={`${item.width} x ${item.height}`}
                />

                <InfoRow
                    label="Es reto?"
                    value={item.challengeId}
                />

                <InfoRow
                    label="Archivado"
                    value={item.isArchived}
                />

                <InfoRow
                    label="Ultimo error"
                    value={item.lastError}
                />

                <InfoRow
                    label="Creado"
                    value={formatDate(item.createdAt)}
                />

                <InfoRow
                    label="Actualizado"
                    value={formatDate(item.updatedAtClient)}
                />

                <InfoRow
                    label="Sync Version"
                    value={item.syncVersion}
                />

            </View>

            <Button title="Archiva" onPress= {archiva}/>

        </ScrollView>
    );
};

export default ItemDetail;

const styles = StyleSheet.create({

    container: {
        padding: 16,
        gap: 20,
    },

    image: {
        width: "100%",
        height: 350,
        backgroundColor: "#EAEAEA",
        borderRadius: 12,
    },

    infoContainer: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        gap: 12,
        elevation: 2,
    },

    description: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 1,
        borderColor: "#EEE",
        paddingVertical: 6,
    },

    label: {
        color: "#666",
        fontWeight: "500",
    },

    value: {
        fontWeight: "600",
    },
});
