import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // ou 'react-native-vector-icons/Ionicons'
import LoginScreen from '@/components/LoginScreen';

// Função de logout na HomeScreen
// function HomeScreen({ handleLogout }) {
//     return (
//         <View style={styles.centered}>
//             <Text>Bem-vindo!</Text>
//             <Button title="Logout" onPress={handleLogout} /> {/* Botão de logout */}
//         </View>
//     );
// }
//
// function ProfileScreen() {
//     return (
//         <View style={styles.centered}>
//             <Text>Perfil</Text>
//         </View>
//     );
// }

// Loading screen
function LoadingScreen() {
    return (
        <View style={styles.loadingContainer}>
            <Image
                source={require('../assets/images/brocolli.gif')} // Certifique-se de que o caminho está correto
                style={styles.loadingImage}
                resizeMode="contain"
            />
        </View>
    );
}

// Navegação
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs({ handleLogout }) {
    return (
        <>
            <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline';
                        } else if (route.name === 'Profile') {
                            iconName = focused ? 'person' : 'person-outline';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: '#000',
                    tabBarInactiveTintColor: '#888',
                    tabBarStyle: {
                        backgroundColor: '#f2f2f2', // Cor do fundo da barra de navegação
                        borderTopWidth: 0, // Remove a borda superior
                        elevation: 0, // Remove a sombra (Android)
                        shadowOpacity: 0, // Remove a sombra (iOS)
                        height: 50, // Ajuste a altura da barra de navegação, se necessário
                    },
                    headerStyle: { backgroundColor: '#f2f2f2' },
                    headerTintColor: '#000',
                    headerTitleAlign: 'center',
                })}
            >
                <Tab.Screen name="Home">
                    {() => <HomeScreen handleLogout={handleLogout} />}
                </Tab.Screen>
                <Tab.Screen name="Profile" component={ProfileScreen} />
            </Tab.Navigator>
        </>
    );
}

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simula um carregamento de 2 segundos

        return () => clearTimeout(timer); // Limpa o timeout
    }, []);

    if (isLoading) {
        // Garantir que o loading seja renderizado primeiro
        return <LoadingScreen />;
    }

    const handleLogout = () => {
        setAuthenticated(false); // Define o usuário como não autenticado
    };

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
                <Stack.Screen name="Main">
                    {() => <MainTabs handleLogout={handleLogout} />}
                </Stack.Screen>
            ) : (
                <Stack.Screen name="Login">
                    {() => <LoginScreen setAuthenticated={setAuthenticated} />}
                </Stack.Screen>
            )}
        </Stack.Navigator>
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
        marginLeft: '10%',
        width: 200,
        height: 200,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
    },
});
