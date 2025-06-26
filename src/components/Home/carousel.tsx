import Img1 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.47.58 (2).jpeg'
import Img2 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.48.09.jpeg'
import Img3 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.48.00.jpeg'
import Img4 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.48.07 (1).jpeg'
import Img5 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.47.58 (2).jpeg'

import bake from '@/../public/cookie (2).png'
import Image from "next/image";


import { useState, useEffect } from "react";

export const Carousel = () => {
    const images = [Img1, Img2, Img3, Img4, Img5];
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div id="default-carousel" className="relative h-full w-full">
            <div className="relative h-126 overflow-hidden rounded-none">
            {/* Label on the left */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 px-8 py-4 flex flex-col justify-center items-center">
                <span className="relative mb-2 w-24 h-auto max-w-full drop-shadow-lg flex justify-center items-center">
                <Image
                    width={0}
                    height={0}
                    alt='bake'
                    src={bake.src}
                    className="w-full h-auto"
                    style={{
                    filter: "drop-shadow(0 0 16px #000) drop-shadow(0 2px 8px #000)"
                    }}
                />
                </span>
                <span
                className="font-great-vibes text-white text-5xl sm:text-6xl md:text-8xl font-bold drop-shadow-lg select-none text-center w-full"
                style={{ textShadow: "rgb(0, 0, 0) -1px -1px 20px, rgb(0, 0, 0) -1px -2px 12px" }}
                >
                The Politti&apos;s
                </span>
                <div className="mt-6 flex gap-4 w-100%">
                <button
                    className="bg-pink-500 text-white font-semibold px-6 py-2 rounded shadow hover:bg-yellow-600 transition"
                    onClick={() => window.location.href = '/produtos'}
                >
                    Ver produtos
                </button>
                <button
                    className="bg-pink-500 text-white font-semibold px-6 py-2 rounded shadow hover:bg-yellow-600 transition"
                    onClick={() => window.location.href = '/encomendar'}
                >
                    Encomendar
                </button>
                </div>
            </div>
            {images.map((img, idx) => (
                <div
                key={idx}
                className={`duration-700 ease-in-out absolute inset-0 transition-opacity ${current === idx ? "opacity-100 z-20" : "opacity-0 z-10"}`}
                style={{ pointerEvents: current === idx ? "auto" : "none" }}
                >
                <Image
                    height={0}
                    width={0}
                    src={img.src}
                    className="absolute block w-full h-full object-cover top-0 left-0"
                    alt={`Slide ${idx + 1}`}
                    style={{ filter: "blur(4px)" }}
                />
                </div>
            ))}
            
            </div>                   
        </div>
    );
}