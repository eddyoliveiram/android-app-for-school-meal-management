import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Tab = createBottomTabNavigator();

const MainTabs = ({ handleLogout }) => (
    <>
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
                    backgroundColor: '#fff', // Cor do fundo da barra de navegação
                    borderTopWidth: 0, // Remove a borda superior
                    elevation: 0, // Remove a sombra (Android)
                    shadowOpacity: 0, // Remove a sombra (iOS)
                    height: 50, // Ajuste a altura da barra de navegação
                },
                headerStyle: { backgroundColor: '#f2f2f2' },
                headerTintColor: '#000',
                headerTitleAlign: 'center',
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home">
                {() => <HomeScreen handleLogout={handleLogout} />}
            </Tab.Screen>
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    </>
);

export default MainTabs;
