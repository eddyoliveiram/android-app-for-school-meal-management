import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

const WelcomeScreen = ({ token, logout }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.tokenText}>Seu token: {token}</Text>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>Início</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuButton} onPress={logout}>
                    <Text style={styles.menuButtonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    tokenText: {
        fontSize: 16,
        marginBottom: 20,
        color: 'gray',
    },
    menuContainer: {
        width: '100%',
        alignItems: 'center',
    },
    menuButton: {
        width: '80%',
        padding: 15,
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    menuButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default WelcomeScreen;
