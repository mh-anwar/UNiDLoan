"use client"

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';

export default function Videos() {
    const [data, setData] = useState([]); 
    const [currentIndex, setCurrentIndex] = useState(0); 

    useEffect(() => {
        fetch(`/api/student/videos`)
            .then((response) => {
                console.log(response);
                return response.json();
            })
            .then((data) => {
                setData(data);
                console.log(data);
            });
    }, [])

    const moveUp = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const moveDown = () => {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    if (data.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col justify-center w-full h-full align-middle">
            <div className="self-center w-min h-max">
                <iframe
                    className="self-center border-none"
                    width="315"
                    height="560"
                    src={data[currentIndex].video}
                    title="YouTube video player"
                    frameBorder="0"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
                <Link href={"/profile/" + data[currentIndex].testnetId} className="flex flex-row items-center justify-center gap-3 px-2 align-middle transition-all duration-200 rounded-md">
                    <PersonCircle />
                    <h2 className="text-2xl">Student</h2>
                </Link>
                <div className="flex justify-center gap-3 mt-4">
                    <button onClick={moveUp} className="px-4 py-2 bg-blue-500 text-white rounded-md">Move Up</button>
                    <button onClick={moveDown} className="px-4 py-2 bg-blue-500 text-white rounded-md">Move Down</button>
                </div>
            </div>
        </div>
    );
}
