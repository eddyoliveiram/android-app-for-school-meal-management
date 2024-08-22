import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ActivityIndicator, Platform, StatusBar, Modal, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
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
    const [connectionSuccess, setConnectionSuccess] = useState(null);
    const { apiUrl, setApiUrl } = useApi();

    useEffect(() => {
        if (apiUrl) {
            setModalVisible(false);
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
            setConnectionSuccess(true);
            setMessage('Conexão com a API foi bem-sucedida!');
        } catch (error) {
            setConnectionSuccess(false);
            setMessage('Falha ao conectar-se à API.');
        } finally {
            console.log(apiUrl)
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
            setToken(access_token);
            setAuthenticated(true);
        } catch (error) {
            setMessageModalVisible(true);
            if (error.response && error.response.data.message === "Invalid login details") {
                setMessage('Login ou senha incorretos. Tente novamente.');
            } else {
                setMessage('Erro ao conectar-se à API.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDevelopmentFeature = (feature) => {
        setMessage(`${feature} está em desenvolvimento!`);
        setMessageModalVisible(true);
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
                            placeholderTextColor="#6e6e6e" // Placeholder em cinza mais escuro
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
                <View style={styles.loginFormContainer}>
                    <Image source={require('@/assets/logo.png')} style={styles.logo} />
                    <Text style={styles.appName}>Merenda SP</Text>
                    <Text style={styles.slogan}>Plataforma de controle de merenda escolar.</Text>

                    <Text style={styles.label}>Login</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite seu login"
                        value={login}
                        onChangeText={setLogin}
                        placeholderTextColor="#b3b3b3" // Placeholder em cinza mais escuro
                    />

                    {/* Label de Senha */}
                    <Text style={styles.label}>Senha</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua senha"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#b3b3b3" // Placeholder em cinza mais escuro
                    />

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Ionicons name="log-in-outline" size={20} color="white" />
                            <Text style={[styles.loginButtonText, { marginLeft: 8 }]}>Entrar</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Frase clicável "Não lembro minha senha" */}
                    <TouchableOpacity onPress={() => handleDevelopmentFeature('Recuperar senha')} style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Não lembro minha senha</Text>
                    </TouchableOpacity>

                    {/* Frase clicável "Criar conta" no canto inferior direito */}
                    <View style={styles.createAccountContainer}>
                        <TouchableOpacity onPress={() => handleDevelopmentFeature('Criar conta')}>
                            <Text style={styles.createAccountText}>Criar conta</Text>
                        </TouchableOpacity>
                    </View>
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
        height: 50,
        borderColor: '#f0f0f0',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f0f0f0',
        fontWeight: 'bold',
    },
    loginFormContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    logo: {
        width: 150,
        height: 150,
        alignSelf: 'center',
        marginBottom: 5, // Reduzido para aproximar os textos da logo
    },
    appName: {
        fontSize: 22,
        color: '#00b33c',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 2, // Espaçamento menor entre o appName e o slogan
    },
    slogan: {
        fontSize: 12,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 20, // Espaço para separar o slogan do formulário
    },
    formSpacing: {
        marginTop: 20, // Adiciona uma margem antes do formulário
    },
    label: {
        color: '#666666',
        fontSize: 14,
        marginBottom: 5,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: '#00b33c',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    forgotPassword: {
        marginTop: 20,
        alignSelf: 'center',
    },
    forgotPasswordText: {
        color: '#00b33c',
        fontSize: 14,
        fontWeight: 'bold'
    },
    createAccountContainer: {
        position: 'absolute',
        bottom: 30,
        right: 20,
    },
    createAccountText: {
        color: '#00b33c',
        fontSize: 14,
        fontWeight: 'bold'
        // textDecorationLine: 'underline',
    },
    enhancedModalContainer: {
        width: 300,
        padding: 30,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    enhancedModalMessage: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 25,
    },
    enhancedOkButton: {
        backgroundColor: '#00b33c',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        width: '100%',
    },
    enhancedOkButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});


export default LoginScreen;
