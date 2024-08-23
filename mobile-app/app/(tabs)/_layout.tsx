import React, { useState, useEffect } from 'react';
import LoadingScreen from '@/components/LoadingScreen';
import LoginScreen from '@/components/LoginScreen';
import MainTabs from '@/components/MainTabs';

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000); // Simula um carregamento de 2 segundos
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <>
            {isAuthenticated ? (
                <MainTabs handleLogout={() => setAuthenticated(false)} />
            ) : (
                <LoginScreen setAuthenticated={setAuthenticated} />
            )}
        </>
    );
}
