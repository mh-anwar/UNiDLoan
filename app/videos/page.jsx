import Link from 'next/link';
import { PersonCircle } from 'react-bootstrap-icons';

export default function Videos() {
    return (
        <div className="flex flex-col justify-center w-full h-full align-middle">
            <div className="self-center overflow-scroll w-min h-max">
                <iframe
                    className="self-center border-none"
                    width="315"
                    height="560"
                    src="https://www.youtube.com/embed/rIpIzgLX43A"
                    title="YouTube video player"
                    frameborder="0"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                ></iframe>{' '}
                <Link
                    href={''}
                    className="flex flex-row items-center justify-center gap-3 px-2 align-middle transition-all duration-200 rounded-md "
                >
                    <PersonCircle />
                    <h2 className="text-2xl">Habib Rahman</h2>
                </Link>
            </div>
        </div>
    );
}
