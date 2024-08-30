import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
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
        navigation.goBack();
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
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20} // Ajuste este valor conforme necessário
        >
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header com ícone de voltar e título */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-outline" size={24} color="#000" />
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
                        <Picker.Item label="Selecione o tipo" value="" style={styles.pickerItem} />
                        <Picker.Item label="Café da Manhã" value="breakfast" style={styles.pickerItem} />
                        <Picker.Item label="Almoço" value="lunch" style={styles.pickerItem} />
                        <Picker.Item label="Jantar" value="dinner" style={styles.pickerItem} />
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
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff', // Fundo branco para o header
        paddingBottom: 10,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#008000',
        marginLeft: 10, // Espaço entre a seta de voltar e o título
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
        backgroundColor: '#f0f0f0', // Cor de fundo cinza claro
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#000'
    },
    pickerContainer: {
        borderColor: '#008000',
        // borderWidth: 1,
        borderRadius: 100,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    picker: {
        height: 50,
        width: '100%',
        fontWeight: 'bold',
        // color: '#008000',
        backgroundColor: '#f0f0f0',
    },
    pickerItem: {
        // fontSize: 50,
        fontWeight: 'bold',
    },
    photoButton: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
        flexDirection: 'row', // Para colocar ícone e texto lado a lado
        justifyContent: 'center',
    },
    photoButtonText: {
        color: '#008000',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10, // Espaço entre o ícone e o texto
    },
    photo: {
        width: '100%',
        height: 200, // Altura ajustada
        borderRadius: 10,
        marginBottom: 20,
        alignSelf: 'center',
    },
    textArea: {
        height: 100,
        backgroundColor: '#f0f0f0', // Cor de fundo cinza claro
        borderRadius: 5,
        marginBottom: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlignVertical: 'top',

    },
    inputText: {
        fontWeight: 'bold',
        // color: '#008000',
    },
    saveButton: {
        backgroundColor: '#008000', // Botão verde
        padding: 15, // Padding para o botão
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
        paddingLeft: 10, // Espaço à esquerda da seta de voltar
    },
    icon: {
        marginRight: 0, // Espaço à direita do ícone
    },
});

export default CadastroRefeicaoScreen;
