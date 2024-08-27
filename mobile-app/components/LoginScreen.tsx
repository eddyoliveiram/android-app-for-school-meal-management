import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, StatusBar, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoadingScreen from './LoadingScreen';

const LoginScreen = ({ setAuthenticated }) => {
    const [loading, setLoading] = useState(false);
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageModalVisible, setMessageModalVisible] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            // Simulação de login (trocar por API)
            setTimeout(() => {
                setAuthenticated(true);
                setLoading(false);
            }, 2000);
        } catch (error) {
            setMessage('Erro ao fazer login');
            setMessageModalVisible(true);
            setLoading(false);
        }
    };

    const handleSkipLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setAuthenticated(true);
            setLoading(false);
        }, 2000);
    };

    if (loading) return <LoadingScreen />;

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f8f8f8" />

            {/* Modal de mensagem */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={messageModalVisible}
                onRequestClose={() => setMessageModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text>{message}</Text>
                        <TouchableOpacity onPress={() => setMessageModalVisible(false)} style={styles.okButton}>
                            <Text style={{ color: '#fff' }}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Layout com KeyboardAvoidingView e ScrollView */}
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.formContainer}>
                        <Image source={require('../assets/logo.png')} style={styles.logo} />
                        <Text style={styles.title}>Merenda SP</Text>
                        <Text style={styles.subtitle}>Plataforma Estadual de Controle de Merenda Escolar</Text>

                        <TextInput
                            style={styles.input}
                            placeholder="Login"
                            placeholderTextColor="#b3b3b3"
                            value={login}
                            onChangeText={setLogin}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Senha"
                            placeholderTextColor="#b3b3b3"
                            secureTextEntry={true}
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            {/*<Ionicons name="log-in-outline" size={20} color="white" />*/}
                            <Text style={styles.loginButtonText}>Entrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.skipButton} onPress={handleSkipLogin}>
                            <Text style={styles.skipButtonText}>Pular Login</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* Botão "Criar Conta" fixo no canto inferior */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.createAccountButton}>
                    <Text style={styles.createAccountText}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center', // Centraliza o conteúdo quando o teclado não está ativo
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: 300,
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    okButton: {
        backgroundColor: '#00b33c',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
    },
    formContainer: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 5,
        marginTop: -30
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
        color: '#00b33c'
    },
    subtitle: {
        fontSize: 12,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#b3b3b3'
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
    },
    loginButton: {
        backgroundColor: '#00b33c',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    skipButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    skipButtonText: {
        color: '#00b33c',
        fontWeight: 'bold',
    },
    bottomContainer: {
        position: 'absolute',
        right: 20,
        bottom: 20,
    },
    createAccountText: {
        color: '#00b33c',
        fontWeight: 'bold',
    },
});

export default LoginScreen;
