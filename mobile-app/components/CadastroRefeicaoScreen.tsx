import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'; // Importando o Ionicons
import RefeicaoModal from './RefeicaoModal';

function CadastroRefeicaoScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

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

    const handleSave = (newMeal) => {
        console.log('Refeição salva:', newMeal);
        // Adicione o novo registro `newMeal` ao estado que armazena os registros de refeições.
    };

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Refeições diárias</Text>
            </View>

            <TouchableOpacity style={styles.openModalButton} onPress={() => setModalVisible(true)}>
                <Ionicons name="add-circle-outline" size={24} color="#fff" style={styles.iconStyle} />
                <Text style={styles.openModalButtonText}>Cadastrar</Text>
            </TouchableOpacity>


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
                    onChange={onChangeDate}
                />
            )}

            <ScrollView contentContainerStyle={styles.recordList}>
                {mealRecords.map(record => (
                    <View key={record.id} style={styles.recordItem}>
                        <View style={styles.recordTextContainer}>
                            <Text style={styles.recordText}>{record.mealType}</Text>
                            <Text style={styles.recordDescription}>{record.description}</Text>
                        </View>
                        <Image source={{ uri: record.imageUrl }} style={styles.recordImage} />
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="create-outline" size={24} color="#008000" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton}>
                                <Ionicons name="trash-outline" size={24} color="#FF0000" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <RefeicaoModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSave={handleSave}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    backButton: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    openModalButton: {
        backgroundColor: '#00b33c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row', // Alinha o ícone e o texto na mesma linha
        justifyContent: 'center',
        marginBottom: 20,
    },
    iconStyle: {
        marginRight: 8, // Espaçamento entre o ícone e o texto
    },
    openModalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 20,
        color: 'black',
    },
    recordList: {
        flexGrow: 1,
    },
    recordItem: {
        backgroundColor: '#f2f2f2',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    recordTextContainer: {
        flex: 1,
    },
    recordText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00b33c',
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
    buttonGroup: {
        flexDirection: 'row',
        marginLeft: 10,
    },
    actionButton: {
        marginLeft: 10,
    },
});

export default CadastroRefeicaoScreen;
