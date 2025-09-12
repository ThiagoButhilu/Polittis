"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SucessoPage() {
  const params = useSearchParams();
  const pedidoId = params?.get("pedido") || "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function atualizarPedido() {
      if (!pedidoId) return;

      await fetch(`/api/request/${pedidoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "approved" }),
      });

      setLoading(false);
    }

    atualizarPedido();
  }, [pedidoId]);

  if (loading) return <p>Processando pagamento...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold text-green-600">🎉 Pagamento aprovado!</h1>
      <p className="mt-2">Seu pedido #{pedidoId} foi confirmado com sucesso.</p>
    </div>
  );
}
