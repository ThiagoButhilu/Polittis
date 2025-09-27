'use client'

import Img1 from '@/../public/assets/banners/apres_12_the_polittis.png'
import Img2 from '@/../public/assets/banners/apres_07_the_polittis.png'
import Img3 from '@/../public/assets/banners/apres_08_the_polittis.png'
import Img4 from '@/../public/assets/banners/apres_09_the_polittis.png'
import Img5 from '@/../public/assets/banners/apres_01_the_polittis.png'

import Image from "next/image";
import { useState, useEffect } from "react";

export const Carousel = () => {
    const images = [Img1, Img2, Img3, Img4, Img5];
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setPrev(current);
            setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }, 5000);
        return () => clearInterval(interval);
    }, [current, images.length]);

    return (
        <div id="default-carousel" className="relative h-full w-full overflow-hidden">
            <div className="relative h-126">
                {images.map((img, idx) => {
                    let className = "absolute inset-0 w-full h-full transition-transform duration-700";
                    if (idx === current) {
                        className += " translate-x-0 z-20";
                    } else if (idx === prev) {
                        className += " -translate-x-full z-10";
                    } else {
                        className += " translate-x-full z-0";
                    }
                    return (
                        <div key={idx} className={className} style={{ pointerEvents: current === idx ? "auto" : "none" }}>
                            <Image
                                height={0}
                                width={0}
                                src={img.src}
                                className="block w-full h-full object-cover"
                                alt={`Slide ${idx + 1}`}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
