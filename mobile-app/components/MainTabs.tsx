import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ResponsavelScreen from './ResponsavelScreen';
import AdminScreen from './AdminScreen';
import CadastroRefeicaoScreen from './CadastroRefeicaoScreen'; // Importe a nova tela
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ResponsavelStack = ({ handleLogout }) => (
    <Stack.Navigator>
        <Stack.Screen
            name="Responsavel"
            options={{ headerShown: false }}
        >
            {(props) => <ResponsavelScreen {...props} handleLogout={handleLogout} />}
        </Stack.Screen>
        <Stack.Screen
            name="CadastroRefeicao"
            component={CadastroRefeicaoScreen}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
);

const MainTabs = ({ handleLogout }) => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Responsável') {
                    iconName = focused ? 'person' : 'person-outline';
                } else if (route.name === 'Admin') {
                    iconName = focused ? 'person-add' : 'person-add-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
                display:'none'
            },
            headerStyle: { backgroundColor: '#f2f2f2' },
            headerTintColor: '#000',
            headerTitleAlign: 'center',
            headerShown: false,

        })}
    >
        <Tab.Screen name="Responsável">
            {(props) => <ResponsavelStack {...props} handleLogout={handleLogout} />}
        </Tab.Screen>
        <Tab.Screen name="Admin" component={AdminScreen} />
    </Tab.Navigator>
);

export default MainTabs;
