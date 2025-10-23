"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SucessoPageContent() {
  const params = useSearchParams();
  const pedidoId = params?.get("pedido") || "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pedidoId) {
      setLoading(false);
      return;
    }

    async function sendWppMessage() {

      const message = `Olá! Acabei de fazer um pedido no The Politti's. O número do meu pedido é ${pedidoId}. Gostaria de confirmar os detalhes e o prazo de entrega. Obrigado!`;
      const phoneNumber = "18981268295"; // Substitua pelo número de telefone desejado
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      window.open(url, "_blank");
    }

    async function sendWppClient() {
      const message = `Seu pedido ${pedidoId} foi confirmado com sucesso! Em breve entraremos em contato para confirmar os detalhes e o prazo de entrega. Obrigado por escolher The Politti's! 🍪🎉`;
      const phoneNumber = "11958722569"; // Substitua pelo número de telefone desejado
      const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

      window.open(url, "_blank");
    }

    async function atualizarPedido() {
      try {
        await fetch(`/api/request/${pedidoId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "approved" }),
        });
      } catch (err) {
        console.error("Erro ao atualizar pedido:", err);
      } finally {
        setLoading(false);
      }
    }

    atualizarPedido();
    sendWppMessage();
    sendWppClient();
  }, [pedidoId]);

  if (loading) return <p>Processando pagamento...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold text-green-600">🎉 Pagamento aprovado!</h1>
      <p className="mt-2">Seu pedido #{pedidoId} foi confirmado com sucesso.</p>
    </div>
  );
}
