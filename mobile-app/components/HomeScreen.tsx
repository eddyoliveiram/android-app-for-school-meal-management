import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícones de lupa

const { width } = Dimensions.get('window'); // Obtém a largura da tela

function HomeScreen({ handleLogout }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header com logo, saudação e botão de logout */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/logo.png')} style={styles.logo} />
                </View>
                <Text style={styles.greeting}>Merenda SP</Text>

                {/* Botão de Logout */}
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={24} color="#00b33c" />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            {/* Card maior de Controle */}
            <View style={styles.controlContainer}>
                <Text style={styles.controlLabel}>Controle</Text>

                <View style={styles.cardsContainer}>
                    <TouchableOpacity style={styles.card}>
                        <Ionicons name="cube-outline" size={60} color="#008000" />
                        <Text style={styles.cardLabel}>Estoque</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Ionicons name="fast-food-outline" size={60} color="#008000" />
                        <Text style={styles.cardLabel}>Refeições</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    logoContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    logo: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#00b33c',
        flex: 1,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logoutText: {
        color: '#00b33c',
        fontSize: 16,
        marginLeft: 5,
    },
    controlContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    controlLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#008000',
        marginBottom: 20,
        textAlign: 'left',
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff'
    },
    card: {
        backgroundColor: '#e6ffe6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: (width / 2) - 50,  // Ajuste o tamanho dos cards dentro do container maior
        height: (width / 2) - 50,
    },
    cardLabel: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#008000',
    },
});

export default HomeScreen;
