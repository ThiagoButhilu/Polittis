"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function FalhaPage() {
  const params = useSearchParams();
  const pedidoId = params?.get("pedido");

  useEffect(() => {
    if (!pedidoId) return;
    fetch(`/api/pedidos/${pedidoId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "failed" }),
    });
  }, [pedidoId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold text-red-600">❌ Pagamento recusado</h1>
      <p className="mt-2">Infelizmente o pagamento do pedido #{pedidoId} não foi aprovado.</p>
    </div>
  );
}
