'use client';
import { useEffect, useState } from 'react';

import InvestMoney from './InvestMoney';
import { UserContext } from '../layout';
import { useContext } from 'react';

export function Navigation()
{
	const [label, setLabel] = useState('Login');
    const { displayLogin, setDisplayLogin } = useContext(UserContext);

	return (
		<nav className='flex flex-row justify-end w-full p-2 gap-2'>
			<InvestMoney />
			<button
				className='bg-blue-500'
				onClick={() => {
					setDisplayLogin(true)
				}}
			>
				{label}
			</button>
		</nav>
	);
}
