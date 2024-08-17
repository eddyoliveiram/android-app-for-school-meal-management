import React, { useState } from 'react';
import { ApiProvider } from '@/app/context/ApiContext';
import WelcomeScreen from '@/components/WelcomeScreen';
import LoginScreen from '@/components/LoginScreen';

export default function MainScreen() {
    const [authenticated, setAuthenticated] = useState(false);
    const [token, setToken] = useState(null);  // Armazena o token

    const handleLogout = () => {
        setAuthenticated(false);
        setToken(null); // Limpa o token ao fazer logout
    };

    return (
        <ApiProvider>
            {!authenticated ? (
                <LoginScreen setAuthenticated={setAuthenticated} setToken={setToken} />
            ) : (
                <WelcomeScreen token={token} logout={handleLogout} />
            )}
        </ApiProvider>
    );
}
