import Image from "next/image";
import { useState } from "react";
import { Clock, CheckCircle, Gift } from "lucide-react";


const Section = () => {
    return (
         <section className="py-16 bg-gradient-to-r from-sky-600/10 to-indigo-600/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4">
            Kits para Encomenda
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Kits especiais para seus momentos únicos - Encomende com antecedência
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Clock className="w-5 h-5 text-sky-600" />
              <span className="text-slate-700">48h de antecedência</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Gift className="w-5 h-5 text-purple-600" />
              <span className="text-slate-700">Kits personalizados</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-slate-700">Qualidade garantida</span>
            </div>
          </div>
        </div>
      </section>
    )
}

export default function Home() {
    return(
        <Section/>
    )
}
