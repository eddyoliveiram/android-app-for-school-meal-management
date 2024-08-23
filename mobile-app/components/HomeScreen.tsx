import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';

const HomeScreen = ({ handleLogout }) => {
    return (
        <View style={styles.centered}>
            {/* Força a barra de status a ter texto e ícones claros */}
            <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
            <Text style={styles.title}>Bem-vindo à Home!</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#000000',
    },
});

export default HomeScreen;
