'use client';
import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import '@/app/globals.css';
import ContractOverlay from './components/contract.jsx';
import CreateContractOverlay from './createContract.jsx';
import { Navigation } from './components/Navigation.jsx';

// context
export const UserContext = React.createContext(null);

// Layout Component
export default function RootLayout({ children }) {
	const [displayContract, setDisplayContract] = useState(true);

	return (
		<UserContext.Provider
			value={{
				displayContract: displayContract,
				setDisplayContract: setDisplayContract,
			}}
		>
			<html lang='en'>
				<body className='flex flex-col'>
					<Navigation />
					{children}

					<AnimatePresence
						initial={false}
						mode='wait'
						onExitComplete={() => null}
					>
						{/*             {displayContract && <CreateContractOverlay />}
						 */}{' '}
					</AnimatePresence>
				</body>
			</html>
		</UserContext.Provider>
	);
}
