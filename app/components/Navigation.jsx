'use client';
import { useEffect, useState } from 'react';

import InvestMoney from './InvestMoney';
import { UserContext } from '../layout';
import { useContext } from 'react';
import { House, HouseFill, PersonCircle } from 'react-bootstrap-icons';
import Router from 'next/router';
import Link from 'next/link';

export function Navigation()
{
	const [label, setLabel] = useState('Log In');
    const { displayLogin, setDisplayLogin } = useContext(UserContext);

	return (
		<nav className='flex flex-row gap-5 justify-end p-5 w-full border-b-2 font-sgt bg-slate-800/10 border-zinc-700/40'>
			<div className='flex-grow'>
				<button
					className='border-2 shadow-md transition-all duration-200'
				>
					<Link
					 	href="/"
						className='flex flex-row gap-3 items-center text-zinc-200'
					>
						<HouseFill/>
						Home
					</Link>
				</button>
			</div>
			<InvestMoney/>
			<button
				className='flex flex-row gap-3 items-center border-2 border-green-800 shadow-md transition-all duration-200 hover:bg-green-500 hover:border-green-900 hover:text-zinc-900 bg-green-900/20'
				onClick={() => {
					setDisplayLogin(true)
				}}
			>
				<PersonCircle/>
				{label}
			</button>
		</nav>
	);
}
