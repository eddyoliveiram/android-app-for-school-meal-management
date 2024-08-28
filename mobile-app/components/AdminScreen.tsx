import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

const AdminScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <Text style={styles.title}>Admin</Text>
            {/* Informações adicionais do perfil podem ser adicionadas aqui */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default AdminScreen;
