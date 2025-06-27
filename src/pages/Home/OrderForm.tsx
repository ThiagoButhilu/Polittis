import { useState } from "react";
import { CalendarDays, User, Phone, MapPin, MessageSquare } from "lucide-react";
import { Kit } from "@/components/Product/Kit";


interface ProductOrderFormProps {
  kit: Kit
}

const OrderForm = ({ kit}: ProductOrderFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryDate: '',
    deliveryTime: '',
    address: '',
    observations: '',
    quantity: 1
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados da encomenda:', { kit });
    
    // Simular envio do pedido
    alert('Encomenda enviada com sucesso! Entraremos em contato em breve.');
  };

  const today = new Date().toISOString().split('T')[0];
  const minDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 2 dias a partir de hoje

  return (
    <div className="bg-gradient-to-r from-sky-50 to-indigo-50 border-sky-200">
      <div>
        <div className="text-xl text-slate-800 flex items-center">
          <CalendarDays className="w-5 h-5 mr-2 text-sky-600" />
          Fazer Encomenda
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Dados Pessoais */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <User className="w-4 h-4 inline mr-1" />
                Nome Completo *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Seu nome completo"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                <Phone className="w-4 h-4 inline mr-1" />
                Telefone/WhatsApp *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="(11) 99999-9999"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
          </div>

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
              onChange={handleInputChange}
              min="1"
              max="10"
              className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
            />
          </div>

          {/* Endereço */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              <MapPin className="w-4 h-4 inline mr-1" />
              Endereço para Entrega
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-sky-200 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              placeholder="Rua, número, bairro, cidade (ou deixe vazio para retirada na loja)"
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
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 text-lg font-semibold"
          >
            Confirmar Encomenda
          </button>
          
          <p className="text-xs text-slate-500 text-center">
            Após enviar, entraremos em contato para confirmar os detalhes e forma de pagamento
          </p>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;