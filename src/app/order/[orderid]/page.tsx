// app/order/[orderid]/page.tsx

import { kitsData } from '../../data/kitsData'
import { Kit } from '@/components/Product/Kit'
import { CheckCircle, ShoppingCart, Clock, Users } from "lucide-react";
import OrderForm from "@/pages/Home/OrderForm"
import Image from "next/image";

import React from "react";

export function generateStaticParams() {
  return kitsData.map(kit => ({
    orderid: kit.id.toString(),
  }));
}

export default async function Page({ params }: { params: Promise<{ orderid: string }> }) {
  const { orderid } = await params;
  const orderIdNumber = Number(orderid);
  const k: Kit | undefined = kitsData.find(kit => Number(kit.id) === orderIdNumber);
  const selectedImageIndex = 0;

  if (!k) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-serif text-slate-800 mb-4">Produto não encontrado</h1>
          <button onClick={() => (window.location.href = `/order`)}>
            Voltar para Kits
          </button>
        </div>
      </div>
    );
  }

  // Array de imagens para galeria (usando as mesmas imagens como exemplo)
  const productImages = [k.image];

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <nav />
      <div className="container mx-auto px-4 py-8">
        {/* Botão Voltar */}
        

        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg">
              <Image
                width={500}
                height={500}
                src={productImages[selectedImageIndex]}
                alt={k.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <div
                  key={image}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? 'border-sky-600 ring-2 ring-sky-200'
                      : 'border-gray-200'
                  }`}
                >
                  <Image
                    width={500}
                    height={400}
                    src={image}
                    alt={`${k.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {k.category}
                </span>
              </div>
              <h1 className="text-3xl font-serif text-slate-800 mb-4">{k.name}</h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">{k.description}</p>
              <div className="flex items-center space-x-6 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-sky-600" />
                  <span className="text-slate-700">{k.serves}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-slate-700">48h antecedência</span>
                </div>
              </div>
            </div>

            {/* Itens Inclusos */}
            <div className="bg-white/80 backdrop-blur-sm border-sky-100 p-4 rounded-lg">
              <div className="pb-3">
                <div className="text-lg text-slate-800">Itens Inclusos</div>
              </div>
              <div>
                <div className="grid gap-3">
                  {k.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Preço e Formulário */}
            <div className="bg-white/80 backdrop-blur-sm border-sky-100 p-4 rounded-lg">
              <div className="pt-6">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-3xl font-bold text-slate-800">{k.price}</span>
                    <span className="text-lg text-slate-600">por kit</span>
                  </div>
                  <p className="text-sm text-slate-600">
                    Preço especial para encomendas com 48h de antecedência
                  </p>
                </div>
                <OrderForm kit={k} />
              </div>
            </div>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-serif text-slate-800 mb-6 text-center">Informações Importantes</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/80 backdrop-blur-sm border-sky-100 text-center p-6 rounded-lg">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Prazo de Entrega</h3>
              <p className="text-sm text-slate-600">
                Mínimo de 48 horas para preparação com todo carinho
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border-sky-100 text-center p-6 rounded-lg">
              <ShoppingCart className="w-8 h-8 text-sky-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Entrega</h3>
              <p className="text-sm text-slate-600">
                Disponível para retirada na loja ou entrega local
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm border-sky-100 text-center p-6 rounded-lg">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-800 mb-2">Qualidade</h3>
              <p className="text-sm text-slate-600">
                Ingredientes frescos e preparo artesanal garantido
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
