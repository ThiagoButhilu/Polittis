import React from "react";
import img1 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.48.06.jpeg'
import img2 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.51.34 (1).jpeg'
import img3 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.48.00 (1).jpeg'
import img4 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.51.37 (1).jpeg'
import img5 from '@/../public/ensaios/galery/WhatsApp Image 2025-06-23 at 18.48.46.jpeg'
import img6 from '@/../public/ensaios/WhatsApp Image 2025-06-23 at 18.51.35 (1).jpeg'
import Image from "next/image";


export const Galery = () => {
    const galeryImages: string[] = [
        img1.src,
        img2.src,
        img3.src,
        img4.src,
        img5.src,
        img6.src
    ];

    const [current, setCurrent] = React.useState(0);
    const total = galeryImages.length;

    const prev = () => setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
    const next = () => setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));

    // Auto-slide logic
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
        }, 3000); // 3 seconds
        return () => clearTimeout(timer);
    }, [current, total]);

    return (
        <section className="py-20 bg-gradient-to-br from-white/80 to-sky-50/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-serif text-slate-800 mb-4">Nossos Momentos Doces</h2>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Acompanhe nossa jornada e veja de perto a arte por trás de cada doce especial
                    </p>
                </div>
                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
                    {/* Photo Gallery */}
                    <div className="order-2 lg:order-1">
                        <h3 className="text-2xl font-serif text-slate-800 mb-6 text-center lg:text-left">Galeria de Fotos</h3>
                        <div className="relative w-full max-w-lg mx-auto lg:mx-0">
                            <div className="aspect-square bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center overflow-hidden rounded-xl shadow-lg">
                                <Image
                                    width={0}
                                    height={0}
                                    src={galeryImages[current]}
                                    alt={`Foto ${current + 1}`}
                                    className="w-full h-full object-cover transition-all duration-500"
                                />
                            </div>
                            <button
                                onClick={prev}
                                className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition"
                                aria-label="Anterior"
                                type="button"
                            >
                                <span className="text-2xl">&lt;</span>
                            </button>
                            <button
                                onClick={next}
                                className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition"
                                aria-label="Próximo"
                                type="button"
                            >
                                <span className="text-2xl">&gt;</span>
                            </button>
                            <div className="flex justify-center gap-2 mt-4">
                                {galeryImages.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrent(idx)}
                                        className={`w-3 h-3 rounded-full ${current === idx ? 'bg-pink-500' : 'bg-gray-300'}`}
                                        aria-label={`Ir para foto ${idx + 1}`}
                                        type="button"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Instagram Invitation */}
                    <div className="order-1 lg:order-2 text-center">
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-3xl font-serif text-slate-800 mb-4">Siga-nos no Instagram</h3>
                                <p className="text-lg text-slate-700 leading-relaxed mb-6">
                                    Não perca nenhum momento doce! Acompanhe nosso dia a dia, veja as novidades em primeira mão 
                                    e se inspire com nossas criações exclusivas.
                                </p>
                                <div className="space-y-4">
                                    <p className="text-slate-600">
                                        ✨ Receitas exclusivas<br />
                                        📸 Bastidores da confeitaria<br />
                                        🎂 Criações personalizadas<br />
                                        💝 Dicas especiais
                                    </p>
                                </div>
                            </div>
                            <div className="flex sm:flex-row gap-4 justify-center">
                                <a
                                    href="https://instagram.com/thepolittis"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-lg font-semibold"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                    Seguir @thepolittis
                                </a>
                               
                            </div>
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                                <p className="text-sm text-slate-600 mb-2">📱 Instagram oficial</p>
                                <p className="text-xl font-semibold text-slate-800">@thepolittis</p>
                                <p className="text-sm text-slate-600 mt-2">Mais de 1.000 seguidores apaixonados por doces!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
