// app/failed/FalhaPageContent.tsx
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function FalhaPageContent() {
  const params = useSearchParams();
  const pedidoId = params?.get("pedido") || "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pedidoId) {
      setLoading(false);
      return;
    }

    async function atualizarStatus() {
      try {
        await fetch(`/api/pedidos/${pedidoId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "failed" }),
        });
      } catch (err) {
        console.error("Erro ao atualizar status do pedido:", err);
      } finally {
        setLoading(false);
      }
    }

    atualizarStatus();
  }, [pedidoId]);

  if (loading) return <p>Processando status do pagamento...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-2xl font-bold text-red-600">❌ Pagamento recusado</h1>
      <p className="mt-2">
        Infelizmente o pagamento do pedido #{pedidoId} não foi aprovado.
      </p>
    </div>
  );
}
