'use client';
import { useEffect, useState } from 'react';

import InvestMoney from './InvestMoney';
import { UserContext } from '../layout';
import { useContext } from 'react';
import { House, HouseFill, PersonCircle } from 'react-bootstrap-icons';
import Router from 'next/router';
import Link from 'next/link';

export function Navigation() {
    const [label, setLabel] = useState('Log In');
    const { displayLogin, setDisplayLogin, nearID, type } =
        useContext(UserContext);
    const url = '/' + (type == 'student' ? 'profile' : 'invest') + '/' + nearID;
    return (
        <nav className="flex flex-row justify-end w-full gap-5 p-5 border-b-2 font-sgt bg-slate-800/10 border-zinc-700/40">
            <div className="flex-grow">
                <button className="transition-all duration-200 border-2 shadow-md">
                    <Link
                        href="/"
                        className="flex flex-row items-center gap-3 text-zinc-200"
                    >
                        <HouseFill />
                        Home
                    </Link>
                </button>
            </div>

            {nearID ? (
                <Link
                    href={url}
                    className="flex flex-row items-center gap-3 px-2 transition-all duration-200 border-2 border-green-800 rounded-md shadow-md hover:bg-green-500 hover:border-green-900 hover:text-zinc-900 bg-green-900/20"
                >
                    <PersonCircle /> My Home
                </Link>
            ) : (
                <button
                    className="flex flex-row items-center gap-3 transition-all duration-200 border-2 border-green-800 shadow-md hover:bg-green-500 hover:border-green-900 hover:text-zinc-900 bg-green-900/20"
                    onClick={() => {
                        setDisplayLogin(true);
                    }}
                >
                    <PersonCircle />
                    {label}
                </button>
            )}
        </nav>
    );
}
