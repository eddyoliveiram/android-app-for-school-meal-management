import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Platform, StatusBar, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; // Certifique-se de que o pacote @expo/vector-icons está instalado
import { useApi } from '@/app/context/ApiContext';

const LoginScreen = ({ setAuthenticated, setToken }) => {
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(true);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [messageModalVisible, setMessageModalVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [connectionSuccess, setConnectionSuccess] = useState(null); // Novo estado para rastrear o sucesso da conexão
    const { apiUrl, setApiUrl } = useApi();  // Usando o contexto

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
            setConnectionSuccess(true);
            setMessage('Conexão com a API foi bem-sucedida!');
        } catch (error) {
            console.error('Erro ao conectar-se à API:', error);
            setConnectionSuccess(false);
            setMessage('Falha ao conectar-se à API.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrl}/api/login`, {
                login: login,
                password: password
            });
            const { access_token } = response.data;
            console.log('Login bem-sucedido. Token:', access_token);

            setToken(access_token); // Armazena o token
            setAuthenticated(true); // Define o usuário como autenticado
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === "Invalid login details") {
                setMessage('Login ou senha incorretos. Tente novamente.');
            } else if (error.request) {
                setMessage('Nenhuma resposta da API. Verifique sua conexão ou o URL da API.');
            } else {
                setMessage('API response: ' + error.response.data.message);
            }
            setMessageModalVisible(true); // Mostra o modal de mensagem
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={messageModalVisible}
                onRequestClose={() => setMessageModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.enhancedModalContainer}>
                        <Text style={styles.enhancedModalMessage}>{message}</Text>
                        <TouchableOpacity onPress={() => setMessageModalVisible(false)} style={styles.enhancedOkButton}>
                            <Text style={styles.enhancedOkButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={styles.loginContainer}>
                    {message && (
                        <View style={[styles.connectionMessageContainer, { flexDirection: 'row', alignItems: 'center', marginBottom: 15 }]}>
                            <Ionicons
                                name={connectionSuccess ? "checkmark-circle" : "close-circle"}
                                size={24}
                                color={connectionSuccess ? "green" : "red"}
                            />
                            <Text
                                style={[
                                    styles.connectionMessage,
                                    { color: connectionSuccess ? "green" : "red", marginLeft: 8, flex: 1, marginTop:10 }
                                ]}
                            >
                                {message}
                            </Text>
                        </View>

                    )}
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
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="log-in-outline" size={20} color="white" />
                            <Text style={[styles.loginButtonText, { marginLeft: 8 }]}>Entrar</Text>
                        </View>
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
    connectionMessage: {
        fontSize: 18,
        marginBottom: 15,
        color: 'green',
    },
    enhancedModalContainer: {
        width: 300,
        padding: 30,  // Increased padding for more space
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    enhancedModalMessage: {
        fontSize: 18,  // Increased font size
        textAlign: 'center',
        marginBottom: 25,  // Added more space below the message
    },
    enhancedOkButton: {
        backgroundColor: '#007BFF',
        padding: 12,  // Increased padding for the button
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',  // Make the button full width of the modal
    },
    enhancedOkButtonText: {
        color: '#fff',
        fontSize: 18,  // Increased font size for the button text
    },
});

export default LoginScreen;
