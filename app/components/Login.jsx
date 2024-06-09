import { useState, useContext, CSSProperties } from 'react';
import { UserContext } from '../layout';
import Backdrop from '../common/backdrop';
import { motion, AnimatePresence } from 'framer-motion';
import BouncingDotsLoader from '../common/loader/loader';
import { useRouter } from 'next/navigation';
const loginAnim = {
    hidden: {
        opacity: 0,
        y: '-90px',
    },
    visible: {
        scale: 1,
        opacity: 1,
        y: '0',

        transition: {
            duration: 0.1,
            type: 'spring',
            damping: 50,
            stiffness: 500,
        },
    },
    exit: {
        scale: 0.9,
        y: '-30px',
    },
};

export default function Login() {
    const { displayLogin, setDisplayLogin } = useContext(UserContext);
    const { nearID, setNearID } = useContext(UserContext);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [typedID, setTypedID] = useState('');
    const [passkey, setPasskey] = useState('');
    const [investor, setInvestor] = useState(false);
    const [userState, setUserState] = useState({ state: 'empty', msg: '' });
    const [passState, setPassState] = useState({ state: 'empty', msg: '' });

    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const modal = (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={loginAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-sgt w-[30rem] bg-black/95 rounded-2xl border-2 border-zinc-900/50 p-10 flex flex-col gap-5 pointer-events-auto overflow-clip"
        >
            <h1 className="text-4xl font-bold text-gray-300 font-sg">
                Get Started!
            </h1>
            <p className="text-gray-400">
                You must log in before accessing our services.
            </p>

            <div>
                <label className="text-sm text-rose-600">{userState.msg}</label>
                <input
                    className="w-full px-3 py-2 leading-tight text-gray-300 border rounded shadow appearance-none border-blue-500/20 bg-slate-950 focus:outline-none focus:shadow-outline"
                    id="nearid"
                    type="text"
                    placeholder="Near ID"
                    onChange={(e) => {
                        setTypedID(e.target.value);
                    }}
                />
            </div>

            <div className="flex flex-row w-full gap-5">
                <input
                    className="w-full px-3 py-2 leading-tight text-gray-300 border rounded shadow appearance-none border-blue-500/20 bg-slate-950 focus:outline-none focus:shadow-outline"
                    id="firstname"
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => {
                        setFirstName(e.target.value);
                    }}
                />
                <input
                    className="w-full px-3 py-2 leading-tight text-gray-300 border rounded shadow appearance-none border-blue-500/20 bg-slate-950 focus:outline-none focus:shadow-outline"
                    id="lastname"
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => {
                        setLastName(e.target.value);
                    }}
                />
            </div>

            <div>
                <label className="text-sm text-rose-600">{passState.msg}</label>
                <input
                    className="w-full px-3 py-2 leading-tight text-gray-300 border rounded shadow appearance-none border-blue-500/20 bg-slate-950 focus:outline-none focus:shadow-outline"
                    id="passkey"
                    type="password"
                    placeholder="Passkey"
                    onChange={(e) => {
                        setPasskey(e.target.value);
                    }}
                />
            </div>

            <div>
                <input
                    type="checkbox"
                    name="investor"
                    onClick={() => setInvestor(!investor)}
                />
                <label htmlFor="investor">Investor</label>
            </div>
            <div className="flex flex-row w-full gap-5">
                <button
                    className="inline-flex items-center px-5 py-3 font-semibold text-gray-300 duration-200 border-2 rounded shadow bg-blue-950 hover:bg-slate-950/50 border-blue-800/20 grow"
                    onClick={() => {
                        setLoading(true);
                        if (investor) {
                            // if status is 201, redirect
                            fetch('http://localhost:3000/api/investor/', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    testnetId: typedID,
                                    firstName: firstName,
                                    lastName: lastName,
                                    privateKey: passkey,
                                }),
                            }).then((res) => {
                                if (res.status === 201 || res.status === 200) {
                                    setLoading(false);
                                    setDisplayLogin(false);
                                    router.push('/investor/' + typedID);
                                }
                            });
                        } else {
                            fetch(
                                'http://localhost:3000/api/student/' + typedID,
                                {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        testnetId: typedID,
                                        firstName: firstName,
                                        lastName: lastName,
                                        privateKey: passkey,
                                        bio: '',
                                        linkedin: '',
                                        video: '',
                                    }),
                                }
                            ).then((res) => {
                                if (res.status === 201 || res.status === 200) {
                                    setLoading(false);
                                    setDisplayLogin(false);
                                    router.push('/profile/' + typedID);
                                }
                            });
                        }
                        setNearID(typedID);
                        localStorage.setItem('nearID', typedID);
                        localStorage.setItem(
                            'type',
                            investor ? 'investor' : 'student'
                        );
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        fill="currentColor"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M15.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L12.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                        />
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    <span className="w-full text-xl text-center">Join</span>
                </button>
            </div>

            <AnimatePresence
                initial={true}
                mode="wait"
                onExitComplete={() => null}
            >
                {loading && (
                    <motion.div
                        className="absolute flex items-center justify-center w-full col-span-1 row-span-1 -m-10 h-96 bg-black/80"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <BouncingDotsLoader />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    return (
        <Backdrop
            onClick={() => {
                if (!loading) {
                    setDisplayLogin(false);
                }
            }}
            children={modal}
        ></Backdrop>
    );
}
