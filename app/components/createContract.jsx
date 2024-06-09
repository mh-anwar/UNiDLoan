"use client";
import { useState, useContext, CSSProperties } from "react"
import { UserContext } from "../layout";
import Backdrop from "../common/backdrop";
import { motion, AnimatePresence } from "framer-motion";
import BouncingDotsLoader from "../common/loader/loader";

const loginAnim = {
    hidden: {
        opacity: 0,
        y: "-90px"
    },
    visible: {
        scale: 1,
        opacity: 1,
        y: "0",

        transition: {
            duration: 0.1,
            type: "spring",
            damping: 50,
            stiffness: 500,
        }
    },
    exit: {
        scale: 0.9,
        y: "-30px"
    },
}

export default function CreateContractOverlay() {

    const { displayContract, setDisplayContract } = useContext(UserContext);
    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState('')

    const [messageState, setMessageState] = useState({ state: 'empty', msg: '' })

    const [loading, setLoading] = useState(false)

    const modal = (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={loginAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="font-sgt w-[43rem] bg-black/95 rounded-2xl border-2 border-zinc-900/50 p-10 flex flex-col gap-5 pointer-events-auto overflow-clip"
        >
            <h1 className="font-sg text-4xl font-bold text-gray-300">Create Contract</h1>
            <p className="text-gray-400">Please enter the terms of the agreement, including a message, loan amount and interest rate. Please note these statements are <b>legally binding.</b></p>
            <div>
                <label className="text-sm text-rose-600">{messageState.msg}</label>
                <textarea className="shadow h-32 appearance-none border border-blue-500/20 rounded w-full py-2 px-3 text-gray-300 bg-slate-950 leading-tight focus:outline-none focus:shadow-outline" id="agreement" type="text" placeholder="Agreement (message to student)"
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />
            </div>

            <div className="flex flex-row w-full gap-5 h-14">
                <input className="shadow h-full appearance-none border border-blue-500/20 rounded w-full py-2 px-3 text-gray-300 bg-slate-950 leading-tight focus:outline-none focus:shadow-outline" id="agreement" type="text" placeholder="Loan"
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />
                <input className="shadow h-full appearance-none border border-blue-500/20 rounded w-full py-2 px-3 text-gray-300 bg-slate-950 leading-tight focus:outline-none focus:shadow-outline" id="agreement" type="text" placeholder="Interest"
                    onChange={e => {
                        setUsername(e.target.value)
                    }}
                />
            </div>

            <div className="flex flex-row w-full gap-5">
                <button
                    className="bg-blue-950 hover:bg-slate-950/50 duration-200 text-gray-300 font-semibold py-3 px-4 border-2 border-blue-800/20 rounded shadow inline-flex items-center grow"
                    onClick={() => {
                        setLoading(true);
                        console.log("start loading");
                    }}>
                    <span className="text-center w-full">Submit</span>
                </button>
            </div>

            <AnimatePresence
                initial={true}
                mode='wait'
                onExitComplete={() => null}
            >
                {loading &&
                    <motion.div className="absolute bg-black/80 w-full h-96 col-span-1 row-span-1 -m-10 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <BouncingDotsLoader />
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )

    return (
        <Backdrop
            onClick={() => {
                if(!loading)
                {
                    setDisplayContract(false)
                }
            }}
            children={modal}>
        </Backdrop>
    );
}
