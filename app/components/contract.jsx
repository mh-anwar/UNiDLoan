"use client";
import { useState, useContext, CSSProperties } from "react"
import { UserContext } from "../layout";
import Backdrop from "../common/backdrop";
import { motion, AnimatePresence } from "framer-motion";
import BouncingDotsLoader from "../common/loader/loader";
import { Glow, GlowCapture } from "@codaworks/react-glow";

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

const contract = 
{
    amount: 1000.0,
    interest: 0.1,
    date: Date.now(),
}

export default function ContractOverlay() {

    const { displayContract, setDisplayContract } = useContext(UserContext);
    const { user, setUser } = useContext(UserContext);

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [userState, setUserState] = useState({ state: 'empty', msg: '' })
    const [passState, setPassState] = useState({ state: 'empty', msg: '' })

    const [loading, setLoading] = useState(false)

    const modal = (
        <motion.div
            onClick={(e) => e.stopPropagation()}
            variants={loginAnim}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-5 p-10 overflow-clip rounded-2xl border-2 pointer-events-auto font-sgt bg-black/95 border-zinc-900/50"
        >
            <h1 className="text-4xl font-bold text-gray-300">Contract</h1>
            <div>

            <GlowCapture>
                <Glow color="#f7f5ff">
                    <span className="text-[8rem] leading-tight text-slate-500 glow:text-glow/50 font-lg font-[600]">$10,000</span>
                </Glow>
            </GlowCapture>
            <div className="opacity-75">
                Granted <b>{100}</b> days ago ..
            </div>
            </div>

            <p className="p-2 px-4 text-gray-400 rounded-md border-2 border-slate-800/50">This is a message from an investor...</p>

            <AnimatePresence
                initial={true}
                mode='wait'
                onExitComplete={() => null}
            >
                {loading &&
                    <motion.div className="flex absolute col-span-1 row-span-1 justify-center items-center -m-10 w-full h-96 bg-black/80"
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
                console.log("???")
                if(!loading)
                {
                    setDisplayContract(false)
                }
            }}
            children={modal}>
        </Backdrop>
    );
}
