'use client';
import { useState, useContext, CSSProperties } from 'react';
import { UserContext } from '../layout';
import Backdrop from '../common/backdrop';
import { motion, AnimatePresence } from 'framer-motion';
import BouncingDotsLoader from '../common/loader/loader';
import { toYoctoNear, useLogin } from '../../lib/near';

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

export default function CreateContractOverlay() {
    const {
        nearID,
        displayCreateContract,
        setDisplayCreateContract,
        currentContract,
        setCurrentContract,
        privateKey,
    } = useContext(UserContext);
    const { user, setUser } = useContext(UserContext);

    const [message, setMessage] = useState('');
    const [loan, setLoan] = useState('');
    const [interest, setInterest] = useState('');

    const [messageState, setMessageState] = useState({
        state: 'empty',
        msg: '',
    });

    const [loading, setLoading] = useState(false);

    async function sendMoney(studentId, investorId, amount) {
        const accountId = investorId;
        // retreive the above from mongodb

        const nearConnection = await useLogin(privateKey, accountId);
        const account = await nearConnection.account(accountId);
        const final = await account.sendMoney(studentId, toYoctoNear(amount));
        console.log(final);
        const transactionHash = final.transaction.hash;
        // Send transactionHash and update total monetary value in mongoDB
        // - in the user it should increase totla monetary value, in investor it should increase total investment
    }
    const modal = (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={loginAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-sgt w-[43rem] bg-black/95 rounded-2xl border-2 border-zinc-900/50 p-10 flex flex-col gap-5 pointer-events-auto overflow-clip"
        >
            <h1 className="text-4xl font-bold text-gray-300 font-sg">
                Create Contract with{' '}
                {currentContract.firstName + ' ' + currentContract.lastName}
            </h1>
            <p className="text-gray-400">
                Please enter the terms of the agreement, including a message,
                loan amount and interest rate. Please note these statements are{' '}
                <b>legally binding.</b>
            </p>
            <div>
                <label className="text-sm text-rose-600">
                    {messageState.msg}
                </label>
                <textarea
                    className="w-full h-32 px-3 py-2 leading-tight text-gray-300 border rounded shadow appearance-none border-blue-500/20 bg-slate-950 focus:outline-none focus:shadow-outline"
                    id="agreement"
                    type="text"
                    placeholder="Agreement (message to student)"
                    onChange={(e) => {
                        setMessage(e.target.value);
                    }}
                />
            </div>

            <div className="flex flex-row w-full gap-5 h-14">
                <input
                    className="w-full h-full px-3 py-2 leading-tight text-gray-300 border rounded shadow appearance-none border-blue-500/20 bg-slate-950 focus:outline-none focus:shadow-outline"
                    id="agreement"
                    type="text"
                    placeholder="Loan"
                    onChange={(e) => {
                        setLoan(e.target.value);
                    }}
                />
                <input
                    className="w-full h-full px-3 py-2 leading-tight text-gray-300 border rounded shadow appearance-none border-blue-500/20 bg-slate-950 focus:outline-none focus:shadow-outline"
                    id="agreement"
                    type="text"
                    placeholder="Interest"
                    onChange={(e) => {
                        setInterest(e.target.value);
                    }}
                />
            </div>

            <div className="flex flex-row w-full gap-5">
                <button
                    className="inline-flex items-center px-4 py-3 font-semibold text-gray-300 duration-200 border-2 rounded shadow bg-blue-950 hover:bg-slate-950/50 border-blue-800/20 grow"
                    onClick={() => {
                        setLoading(true);
                        console.log('start loading');
                    }}
                >
                    <span
                        className="w-full text-center"
                        onClick={createContract}
                    >
                        Submit
                    </span>
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
    function createContract(contract, userId, receiverId) {
        fetch('/contract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                studentId: currentContract.testnetId,
                investorId: nearID,
                loanAmount: loan,
                interestRate: interest,
                message: message,
            }),
        });
        sendMoney(currentContract.testnetId, nearID, loan);
        // !! THEN INSTANTIATE THE INVEST
    }
    return (
        <Backdrop
            onClick={() => {
                if (!loading) {
                    setDisplayCreateContract(false);
                }
            }}
            children={modal}
        ></Backdrop>
    );
}
