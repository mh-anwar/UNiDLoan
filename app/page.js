'use client';
import { useState } from 'react';

export default function Root() {
	const [count, setCount] = useState(0);
	console.log('huhh - Home Page');
	return (
		<main className='flex flex-row justify-center w-screen'>
			<div className='w-[50rem] bg-red-500 font-sgt'>
				<p>hello world!</p>
			</div>
		</main>
	);
}
