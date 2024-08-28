import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícones de lupa

const { width } = Dimensions.get('window'); // Obtém a largura da tela

function ResponsavelScreen({ handleLogout, navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header com logo, saudação e botão de logout */}
            <View style={styles.header}>
                <Text style={styles.greeting}>Olá, John Doe.</Text>

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

                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CadastroRefeicao')}>
                        <Ionicons name="fast-food-outline" size={60} color="#008000" />
                        <Text style={styles.cardLabel}>Refeições Diárias</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.card}>
                        <Ionicons name="cube-outline" size={60} color="#008000" />
                        <Text style={styles.cardLabel}>Estoque de Alimentos</Text>
                    </TouchableOpacity>

                </View>
            </View>

            {/* Card de Aviso */}
            <View style={styles.controlContainer}>
                <Text style={styles.controlLabelYellow}>Avisos</Text>

                <View style={styles.cardsContainer}>
                    <TouchableOpacity style={styles.card100}>
                        <Ionicons name="alert-circle-outline" size={60} color="#cc8400" />
                        <Text style={styles.cardLabel100}>Nenhum aviso importante até o momento.</Text>
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
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    greeting: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#008000',
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
        padding: 15,  // Reduzi o padding para deixar os elementos mais próximos
        marginBottom: 10,  // Reduzi o marginBottom para compactar o espaço entre os containers
    },
    controlLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#008000',
        marginBottom: 10,  // Reduzi o marginBottom para diminuir o espaço entre o título e os cards
        textAlign: 'left',
    },
    controlLabelYellow: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#cc8400',
        marginBottom: 10,  // Reduzi o marginBottom para diminuir o espaço entre o título e os cards
        textAlign: 'left',
    },
    cardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',  // Usei 'space-around' para reduzir o espaço entre os cards duplos
        backgroundColor: '#fff',
    },
    card: {
        backgroundColor: '#e6ffe6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: (width / 2) - 50,  // Reduzi a largura dos cards duplos para diminuir o espaço entre eles
        height: (width / 2) - 50,
    },
    cardLabel: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#008000',
        paddingHorizontal:1
    },
    card100: {
        backgroundColor: '#fff5cc', // Fundo amarelo claro
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: width/2 + 110 ,  // Ajuste a largura para considerar o padding horizontal
        padding: 20,
        marginVertical: 5,
    },
    cardLabel100: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#cc8400', // Texto em amarelo escuro
        textAlign: 'center',
    },
});


        export default ResponsavelScreen;
