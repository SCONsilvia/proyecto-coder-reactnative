import {
    Text,
    View,
    Image,
    ScrollView,
    Button,
    StyleSheet,
} from "react-native";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDrawing } from "../../services/database/drawingService";
import { drawingChanged } from "../../features/drawings/drawingsSlice";

import DrawingForm from "../DrawingForm/DrawingForm";

const InfoRow = ({ label, value }) => (
    <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{String(value)}</Text>
    </View>
);

const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleString();
};

const ItemDetail = ({ item }) => {
    const uid = useSelector(state => state.user.uid);
    const dispatch = useDispatch();

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
                source={{ uri: item.localUri }}
                style={styles.image}
                resizeMode="contain"
            />

            <View style={styles.infoContainer}>

                {!editing && (
                    <>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>{item.description}</Text>

                        <Button
                            title="Editar"
                            onPress={() => setEditing(true)}
                            disabled={loading}
                        />
                    </>
                )}

                {editing && (
                    <DrawingForm
                        title={title}
                        setTitle={setTitle}
                        description={description}
                        setDescription={setDescription}
                        loading={loading}
                        onSubmit={handleSave}
                        buttonTitle="Guardar cambios"
                    />
                )}

                <InfoRow label="Estado" value={item.status} />
                <InfoRow label="Archivado" value={item.isArchived} />
                <InfoRow label="Creado" value={formatDate(item.createdAt)} />

            </View>

            <Button
                title={item.isArchived ? "Desarchivar" : "Archivar"}
                onPress={handleArchive}
                disabled={loading}
            />

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

    title: {
        fontSize: 20,
        fontWeight: "700",
    },

    description: {
        fontSize: 16,
        color: "#555",
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