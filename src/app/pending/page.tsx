"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function PendentePage() {
  const params = useSearchParams();
  const pedidoId = params?.get("pedido");

  useEffect(() => {
    if (!pedidoId) return;
    fetch(`/api/pedidos/${pedidoId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "pending" }),
    });
  }, [pedidoId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold text-yellow-600">⌛ Pagamento pendente</h1>
      <p className="mt-2">Seu pedido #{pedidoId} está aguardando confirmação de pagamento.</p>
    </div>
  );
}
