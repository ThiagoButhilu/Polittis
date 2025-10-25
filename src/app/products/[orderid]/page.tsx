'use client'

import { useSession } from "next-auth/react";
import { CheckCircle, Cake  } from "lucide-react";
import OrderForm from "@/pages/Home/OrderForm"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Kit {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity?: number;
  category: string;
  image_url?: string;
  components?: { name: string; quantity: number }[]; 
  type: string;
}

const Page = () => {
    const params = useParams();
  const orderid = params?.orderid; // string | undefined
  const orderIdNumber = Number(orderid);

  const { data: session, status } = useSession();

  const [indexImage, setIndexImage] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [kit, setKit] = useState<Kit | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      console.log("User is authenticated:", session);
    }
  }, [status, session]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/product/${orderIdNumber}`) ;
        const data = await response.json();
        setKit(data);
        console.log(data);

        const resImages = await fetch(`/api/product/images/${orderIdNumber}`);
        const { images } = await resImages.json();
        setImage(data.product?.image_url || "/placeholder.png");
        setProductImages(images.length > 0 ? images : [data.product?.image_url || "/placeholder.png"]);
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [orderIdNumber]);

  if (loading) {
    return <div className="text-center py-20">Carregando...</div>;
  }

  if (!kit) {
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



  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
          {/* Galeria */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white shadow-lg border border-gray-200">
              <Image
              width={500}
              height={500}
              src={image || "/placeholder.png"}
              alt={kit.name || "Imagem do produto"}
              className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <div
                  key={image}
                  onClick={() => {setImage(image); setIndexImage(index)}}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    indexImage === index
                      ? 'border-sky-600 ring-2 ring-sky-200'
                      : 'border-gray-200'
                  }`}
                >
                  <Image
                    width={500}
                    height={400}
                    src={image}
                    alt={`${kit.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Infos */}
          <div className="space-y-6">
            <div className="bg-white/80 shadow-xl p-4 rounded-lg">
            
              <div className="flex items-center justify-center space-x-3 mb-2 text-center align-middle">
                <Cake className="text-purple-600" />
                <h1 className="text-3xl text-center font-serif text-slate-800"> {kit.name} </h1>
              </div>
              <p className="text-lg text-center text-slate-600 mb-6">{kit.description}</p>
            </div>
            <div className="bg-white/80 shadow-xl p-4 rounded-lg">
              {kit.components?.map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Contem {item.quantity} {item.name}</span>
                </div>
              ))}
            </div>
            <div className="bg-white/80 shadow-xl p-4 rounded-lg">
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-bold">R${kit.price}</span>
                <span className="text-lg">por kit</span>
              </div>
              <OrderForm kit={kit} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
