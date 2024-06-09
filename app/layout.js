'use client';
import '@/app/globals.css';
import { Navigation } from './components/Navigation';
import React, { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import ContractOverlay from './components/contract';
import { useState } from 'react';
import CreateContractOverlay from './components/createContract';
import Login from './components/Login';

// context
export const UserContext = React.createContext(null);

// Layout Component
export default function RootLayout({ children }) {
    const [displayCreateContract, setDisplayCreateContract] = useState(false);
    const [displayContract, setDisplayContract] = useState(false);
    const [displayLogin, setDisplayLogin] = useState(false);
    const [nearID, setNearID] = useState();
    const [type, setType] = useState();
    const [privateKey, setPrivateKey] = useState();
    const [currentContract, setCurrentContract] = useState(null);
    useEffect(() => {
        setNearID(localStorage.getItem('nearID'));
        setType(localStorage.getItem('type'));
        setPrivateKey(localStorage.getItem('privateKey'));
    }, []);
    return (
        <UserContext.Provider
            value={{
                displayContract: displayContract,
                setDisplayContract: setDisplayContract,
                displayCreateContract: displayCreateContract,
                setDisplayCreateContract: setDisplayCreateContract,
                nearID: nearID,
                setNearID: setNearID,
                displayLogin: displayLogin,
                setDisplayLogin: setDisplayLogin,
                currentContract: currentContract,
                setCurrentContract: setCurrentContract,
                type: type,
                setType: setType,
                privateKey: privateKey,
                setPrivateKey: setPrivateKey,
            }}
        >
            <html lang="en" className="dark">
                <body className="flex flex-col">
                    <div className="w-full h-screen">
                        <Navigation />
                        <br />
                        {children}
                        <AnimatePresence
                            initial={false}
                            mode="wait"
                            onExitComplete={() => null}
                        >
                            {displayCreateContract && <CreateContractOverlay />}
                            {displayContract && <ContractOverlay />}
                            {displayLogin && <Login />}
                        </AnimatePresence>
                    </div>
                </body>
            </html>
        </UserContext.Provider>
    );
}
