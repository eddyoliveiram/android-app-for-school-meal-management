import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

function LoadingScreen() {
    return (
        <View style={styles.loadingContainer}>
            <Image
                source={require('../assets/images/brocolli.gif')} // Atualize para o caminho correto
                style={styles.loadingImage}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
    loadingImage: {
        width: 200,
        height: 200,
    },
});

export default LoadingScreen;
