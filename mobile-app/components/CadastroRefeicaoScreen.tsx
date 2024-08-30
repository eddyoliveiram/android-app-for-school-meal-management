import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

function CadastroRefeicaoScreen({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [mealType, setMealType] = useState('');
    const [photo, setPhoto] = useState(null);
    const [description, setDescription] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const mealRecords = [
        {
            id: 1,
            date: '28/08/2024',
            mealType: 'Café da Manhã',
            description: 'Pão, manteiga, café',
            imageUrl: 'https://img.freepik.com/fotos-premium/pao-de-pao-com-manteiga-e-cafe-preto-pao-tipico-frances-brasileiro-com-xicara-de-cafe-forte-cafe-da-manha-brasileiro_72932-2880.jpg?quality=90&resize=556,505',
        },
        {
            id: 2,
            date: '28/08/2024',
            mealType: 'Almoço',
            description: 'Arroz, feijão, frango grelhado',
            imageUrl: 'https://img.freepik.com/fotos-premium/feijao-de-arroz-e-file-de-frango-grelhado_499484-27.jpg?quality=90&resize=556,505',
        },
        {
            id: 3,
            date: '28/08/2024',
            mealType: 'Jantar',
            description: 'Sopa de legumes',
            imageUrl: 'https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2023/09/Vegetable-Soup-main.jpg?quality=90&resize=556,505',
        },
    ];

    const groupedRecords = mealRecords.reduce((acc, record) => {
        acc[record.date] = acc[record.date] || [];
        acc[record.date].push(record);
        return acc;
    }, {});

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a câmera e a galeria.');
            }
        })();
    }, []);

    const handleSave = () => {
        console.log('Refeição salva:', { date, mealType, photo, description });
        setModalVisible(false);
    };

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };

    const openCameraOrGallery = async () => {
        Alert.alert(
            "Selecionar Imagem",
            "Escolha a origem da imagem",
            [
                {
                    text: "Câmera",
                    onPress: async () => {
                        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
                        if (cameraPermission.status !== 'granted') {
                            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a câmera.');
                            return;
                        }

                        const result = await ImagePicker.launchCameraAsync({
                            allowsEditing: true,
                            quality: 1,
                        });

                        if (!result.canceled) {
                            setPhoto(result.assets[0].uri);
                        }
                    }
                },
                {
                    text: "Galeria",
                    onPress: async () => {
                        const mediaLibraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                        if (mediaLibraryPermission.status !== 'granted') {
                            Alert.alert('Permissão necessária', 'Precisamos da permissão para acessar a galeria.');
                            return;
                        }

                        const result = await ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ImagePicker.MediaTypeOptions.Images,
                            allowsEditing: true,
                            quality: 1,
                        });

                        if (!result.canceled) {
                            setPhoto(result.assets[0].uri);
                        }
                    }
                },
                { text: "Cancelar", style: "cancel" }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            {/* Botão para abrir o modal */}
            <TouchableOpacity style={styles.openModalButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.openModalButtonText}>Cadastrar Nova Refeição</Text>
            </TouchableOpacity>

            {/* Lista de registros agrupados por data */}
            <ScrollView contentContainerStyle={styles.recordList}>
                {Object.keys(groupedRecords).map(date => (
                    <View key={date} style={styles.dateCard}>
                        <Text style={styles.dateText}>{date}</Text>
                        {groupedRecords[date].map(record => (
                            <View key={record.id} style={styles.recordItem}>
                                <View style={styles.recordTextContainer}>
                                    <Text style={styles.recordText}>{record.mealType}</Text>
                                    <Text style={styles.recordDescription}>{record.description}</Text>
                                </View>
                                <Image source={{ uri: record.imageUrl }} style={styles.recordImage} />
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>

            {/* Modal com o formulário de cadastro */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <KeyboardAvoidingView
                        style={styles.modalContainer}
                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Ajuste este valor conforme necessário
                    >
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            {/* Header com ícone de fechar e título */}
                            <View style={styles.header}>
                                <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible(false)}>
                                    <Ionicons name="close-outline" size={24} color="#000" />
                                </TouchableOpacity>
                                <Text style={styles.headerTitle}>Cadastro de Refeição</Text>
                            </View>

                            <Text style={styles.label}>Data</Text>
                            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Selecione a data"
                                    value={date.toLocaleDateString()}
                                    editable={false}
                                />
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={handleDateChange}
                                />
                            )}

                            <Text style={styles.label}>Tipo de Refeição</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={mealType}
                                    style={styles.picker}
                                    onValueChange={(itemValue) => setMealType(itemValue)}
                                >
                                    <Picker.Item label="Selecione o tipo" value="" />
                                    <Picker.Item label="Café da Manhã" value="breakfast" />
                                    <Picker.Item label="Almoço" value="lunch" />
                                    <Picker.Item label="Jantar" value="dinner" />
                                </Picker>
                            </View>

                            <Text style={styles.label}>Foto</Text>
                            <TouchableOpacity style={styles.photoButton} onPress={openCameraOrGallery}>
                                <Ionicons name="camera-outline" size={24} color="#008000" style={styles.icon} />
                                <Text style={styles.photoButtonText}>Tirar Foto ou Escolher da Galeria</Text>
                            </TouchableOpacity>
                            {photo && <Image source={{ uri: photo }} style={styles.photo} resizeMode="contain" />}

                            <Text style={styles.label}>Descrição</Text>
                            <TextInput
                                style={[styles.textArea, styles.inputText]}
                                placeholder=""
                                placeholderTextColor="#008000"
                                value={description}
                                onChangeText={setDescription}
                                multiline={true}
                                numberOfLines={4}
                            />

                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 60,
        flex: 1,
    },
    openModalButton: {
        backgroundColor: '#008000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    openModalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    recordList: {
        flexGrow: 1,
    },
    dateCard: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#006600',
        marginBottom: 10,
    },
    recordItem: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordTextContainer: {
        flex: 1,
    },
    recordText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#008000',
    },
    recordDescription: {
        fontSize: 14,
        color: '#333',
    },
    recordImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginLeft: 10,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    modalContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 10,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#008000',
        marginLeft: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#008000',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#000',
    },
    pickerContainer: {
        borderRadius: 5,
        marginBottom: 20,
    },
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#f0f0f0',
    },
    photoButton: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    photoButtonText: {
        color: '#008000',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    photo: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    textArea: {
        height: 100,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: 'top',
    },
    inputText: {
        fontWeight: 'bold',
    },
    saveButton: {
        backgroundColor: '#008000',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        paddingLeft: 10,
    },
    icon: {
        marginRight: 10,
    },
});

export default CadastroRefeicaoScreen;
