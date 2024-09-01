import React from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ícones de lupa

const { width } = Dimensions.get('window'); // Obtém a largura da tela

function ResponsavelScreen({ handleLogout, navigation }) {
    const menuItems = [
        {
            title: 'Refeições Diárias',
            description: "Registre as refeições do dia",
            icon: 'fast-food-outline',
            color: '#00b33c', // Orange color
            screen: 'CadastroRefeicao'
        },
        {
            title: 'Controle de Estoque',
            description: 'Gerencie o inventário de ingredientes',
            icon: 'cube-outline',
            color: '#800080', // Purple color
            screen: null // Add the screen name if you have a dedicated screen for Stock Control
        },
        {
            title: 'Avisos',
            description: 'Notícias ou comunicados importantes',
            icon: 'alert-circle-outline',
            color: '#ff9933', // Teal color
            screen: null // Add the screen name if you have a dedicated screen for Notices
        }
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />

            {/* Header com saudação e botão de logout */}
            <View style={styles.header}>
                <View style={styles.userInfo}>
                    <Ionicons name="person-circle-outline" size={42} color="#4B5563" />
                    <Text style={styles.userName}>Olá, John Doe.</Text>
                </View>

                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={16} color="#000" />
                    <Text style={styles.logoutText}>Sair</Text>
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <View style={styles.main}>
                {/*<Text style={styles.mainTitle}>School Meal Manager</Text>*/}

                <View style={styles.grid}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, { backgroundColor: item.color + '20' }]} // Light background color
                            onPress={() => item.screen && navigation.navigate(item.screen)}
                        >
                            <View style={[styles.iconContainer, { backgroundColor: item.color + '30' }]}>
                                <Ionicons name={item.icon} size={32} color={item.color} />
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardDescription}>{item.description}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
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
        paddingTop: 50,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1F2937',
        marginLeft: 8,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 50,
    },
    logoutText: {
        color: '#000',
        fontSize: 16,
        marginLeft: 5,
    },
    main: {
        flex: 1,
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 20,
    },
    grid: {
        width: '100%',
        maxWidth: 450, // Aumentei o tamanho máximo dos cards
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 20, // Aumentei o padding para dar mais espaço interno ao card
        // borderRadius: 15, // Aumentei o raio do border para um visual mais suave
        marginBottom: 15, // Aumentei o espaço entre os cards

        // elevation: 8, // Aumentei a elevação para melhorar a sombra
    },
    iconContainer: {
        padding: 12,
        borderRadius: 50,
        marginRight: 16, // Aumentei o espaço entre o ícone e o texto
    },
    cardContent: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 20, // Aumentei o tamanho da fonte
        fontWeight: 'bold',
        color: '#1F2937',
    },
    cardDescription: {
        fontSize: 16, // Aumentei o tamanho da fonte
        // color: '#6B7280',
        marginTop: 4,
    },
});

export default ResponsavelScreen;
