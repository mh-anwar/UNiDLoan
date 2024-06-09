'use client';
import { useState, useContext, CSSProperties } from 'react';
import { UserContext } from './layout';
import Backdrop from './common/backdrop';
import { motion, AnimatePresence } from 'framer-motion';
// import BouncingDotsLoader from "../../common/loader/loader";

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
	const { displayContract, setDisplayContract } = useContext(UserContext);
	const { user, setUser } = useContext(UserContext);

	const [username, setUsername] = useState('');

	const [messageState, setMessageState] = useState({
		state: 'empty',
		msg: '',
	});

	const [loading, setLoading] = useState(false);

	const modal = (
		<motion.div
			onClick={(e) => e.stopPropagation()}
			variants={loginAnim}
			initial='hidden'
			animate='visible'
			exit='exit'
			className='font-sgt w-[30rem] bg-black/95 rounded-2xl border-2 border-zinc-900/50 p-10 flex flex-col gap-5 pointer-events-auto overflow-clip'
		>
			<h1 className='text-4xl font-bold text-gray-300 font-sg'>
				Contracts
			</h1>
			<p className='text-gray-400'>
				Please enter the terms of the agreement, including a message,
				loan amount and interest rate.
			</p>
			<div>
				<label className='text-sm text-rose-600'>
					{messageState.msg}
				</label>
				<textarea
					className='w-full px-3 py-2 leading-tight text-gray-300 border rounded shadow appearance-none border-blue-500/20 bg-slate-950 focus:outline-none focus:shadow-outline'
					id='agreement'
					type='text'
					placeholder='Agreement (message to student)'
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
			</div>

			<div className='flex flex-row w-full gap-5'>
				<button
					className='inline-flex items-center px-4 py-3 font-semibold text-gray-300 duration-200 border-2 rounded shadow bg-blue-950 hover:bg-slate-950/50 border-blue-800/20 grow'
					onClick={() => {
						setLoading(true);
						console.log('start loading');
					}}
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='25'
						fill='currentColor'
						className='bi bi-person-fill'
						viewBox='0 0 16 16'
					>
						<path d='M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z' />
						<path d='M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z' />
					</svg>
					<span className='w-full text-center'>Sign Up</span>
				</button>
			</div>

			<AnimatePresence
				initial={true}
				mode='wait'
				onExitComplete={() => null}
			>
				{loading && (
					<motion.div
						className='absolute flex items-center justify-center w-full col-span-1 row-span-1 -m-10 bg-black/80 h-96'
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
					setDisplayContract(false);
				}
			}}
			children={modal}
		></Backdrop>
	);
}
