import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Platform, StatusBar, Modal, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de que o pacote @expo/vector-icons está instalado

const HomeScreen = () => {
    const [loading, setLoading] = useState(true);
    const [apiUrl, setApiUrl] = useState('');
    const [modalVisible, setModalVisible] = useState(true);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [connectionMessage, setConnectionMessage] = useState('');
    const [connectionSuccess, setConnectionSuccess] = useState(null); // Estado para rastrear o sucesso da conexão

    useEffect(() => {
        if (apiUrl) {
            setModalVisible(false); // Fecha o modal assim que o URL é informado
            testApiConnection();
        }
    }, [apiUrl]);

    const testApiConnection = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${apiUrl}/api/posts`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            console.log('Sucesso');
            setConnectionMessage('Conexão com a API foi bem-sucedida!');
            setConnectionSuccess(true);
        } catch (error) {
            console.error('Erro ao conectar-se à API:', error);
            setConnectionMessage('Falha ao conectar-se à API.');
            setConnectionSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Insira o URL da API</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="https://exemplo.com"
                            value={apiUrl}
                            onChangeText={(text) => setApiUrl(text)}
                        />
                    </View>
                </View>
            </Modal>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.loginContainer}>
                    {connectionMessage ? (
                        <View style={styles.connectionMessageContainer}>
                            <Ionicons
                                name={connectionSuccess ? "checkmark-circle" : "close-circle"}
                                size={24}
                                color={connectionSuccess ? "green" : "red"}
                            />
                            <Text
                                style={[
                                    styles.connectionMessage,
                                    { color: connectionSuccess ? "green" : "red" }
                                ]}
                            >
                                {connectionMessage}
                            </Text>
                        </View>
                    ) : null}
                    <TextInput
                        style={styles.input}
                        placeholder="Login"
                        value={login}
                        onChangeText={setLogin}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity style={styles.loginButton}>
                        <Text style={styles.loginButtonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f8f8f8',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
    loginContainer: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        margin: 20,
    },
    connectionMessageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    connectionMessage: {
        fontSize: 18,
        marginLeft: 10,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default HomeScreen;
