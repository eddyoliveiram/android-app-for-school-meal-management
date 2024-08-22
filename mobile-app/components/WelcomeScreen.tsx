import React, { useEffect } from 'react';
import { Text, View, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons'; // ou 'react-native-vector-icons/Ionicons'

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' }}>
            <Text>Bem-vindo!</Text>
        </View>
    );
}

function ProfileScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' }}>
            <Text>Perfil</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
    return (
        <>
            {/* Configura a barra de status para sempre usar o tema claro */}
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
                        backgroundColor: '#f2f2f2', // Cor fixa da barra inferior
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                    tabBarHideOnKeyboard: true, // Esconde a barra ao aparecer o teclado
                })}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#f2f2f2', // Cor fixa da barra superior
                        },
                        headerTintColor: '#000', // Cor do texto do header
                        headerTitleAlign: 'center',
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: 'Profile',
                        headerShown: true,
                        headerStyle: {
                            backgroundColor: '#f2f2f2', // Cor fixa da barra superior
                        },
                        headerTintColor: '#000', // Cor do texto do header
                        headerTitleAlign: 'center',
                    }}
                />
            </Tab.Navigator>
        </>
    );
}

export default function App() {
    // Certifique-se de não depender de esquemas de cores do sistema

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
    );
}
