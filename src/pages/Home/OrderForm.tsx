"use client"
import { useState } from "react";
import { CalendarDays, MessageSquare, UserRoundX  } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import { useSession } from "next-auth/react";


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


interface ProductOrderFormProps {
  kit: Kit
}



const OrderForm = ({ kit}: ProductOrderFormProps) => {
  const [formData, setFormData] = useState({
    deliveryDate: '',
    deliveryTime: '',
    observations: '',
    quantity: 1
  });

  const router = useRouter();

  
  const { data: session, status } = useSession() || {};


   useEffect(() => {
        if (status === "authenticated") {

        }
      }, [status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  async function handleCheckout(kit: Kit, deliveryDate: string, deliveryTime: string, observations: string, quantity: number, userId: number) {
    console.log("URL usada:", process.env.NEXT_PUBLIC_URL);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kit, deliveryDate, deliveryTime, observations, quantity, userId }),
    });
  
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url; 
    } else {
      alert("Erro ao iniciar pagamento");
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(session?.user.id);

    if (!session?.user.id) {
      alert("Usuário não autenticado. Por favor, faça login.");
    } else {
      handleCheckout(
        kit,
        formData.deliveryDate,
        formData.deliveryTime,
        formData.observations,
        formData.quantity,
        session.user.id as number
      );    
    }

  
  };

  const minDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; 

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm bg-gradient-to-r p-6 from-sky-50 to-indigo-50 border-sky-200">
      <div>
        <div className="text-xl text-slate-800 flex pb-5 items-center">
          <CalendarDays className="w-5 h-5 mr-2 text-sky-600" />
          Fazer Encomenda
        </div>
      </div>
      <div>
        {status !== "authenticated" ? (
          <div className="text-center p-10">
            <p className="text-center text-2xl font-serif text-slate-800 flex items-center justify-center gap-2 mb-4">
            <UserRoundX className="text-center w-6 h-6 text-sky-600" />
            </p>
            
            <p className="mb-4 text-slate-600">Você precisa estar logado para fazer uma encomenda.</p>
            <button 
              onClick={() => router.push('/login')} 
              className="w-full rounded-md bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
            >
              Ir para Login
            </button>
          </div>
        ) : ( 
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Data e Hora */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Data de Entrega/Retirada *
              </label>
              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleInputChange}
                min={minDate}
                required
                className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <p className="text-xs text-slate-500 mt-1">
                Mínimo 48h de antecedência
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Horário Preferido
              </label>
              <select
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="">Selecione o horário</option>
                <option value="manhã">Manhã (8h às 12h)</option>
                <option value="tarde">Tarde (12h às 18h)</option>
                <option value="noite">Noite (18h às 20h)</option>
              </select>
            </div>
          </div>

          {/* Quantidade */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Quantidade de Kits
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={(e) => {
                const value = Math.max(1, parseInt(e.target.value, 10) || 1);
                setFormData(prev => ({ ...prev, quantity: value }));
              }}
              min="1"
              required
              className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          {/* Observações */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <MessageSquare className="w-4 h-4 inline mr-1" />
              Observações
            </label>
            <textarea
              name="observations"
              value={formData.observations}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
              placeholder="Alguma personalização especial, alergia alimentar ou observação importante..."
            />
          </div>

          <button 
            type="submit" 
            className="w-full rounded-md bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
          >
            Confirmar Encomenda
          </button>
          
          <p className="text-xs text-slate-500 text-center">
            Após confirmar, você será redirecionado para a tela de pagamento
          </p>
        </form>
        )
        }
      </div>
    </div>
  );
};

export default OrderForm;