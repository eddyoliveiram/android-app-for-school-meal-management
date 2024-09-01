import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, StyleSheet, TextInput, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
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
            <TouchableOpacity style={styles.openModalButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.openModalButtonText}>Cadastrar Nova Refeição</Text>
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
        backgroundColor: '#e6ffe6',
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
});

export default CadastroRefeicaoScreen;
