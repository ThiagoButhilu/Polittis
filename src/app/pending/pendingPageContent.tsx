"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function PendentePageContent() {
  const params = useSearchParams();
  const pedidoId = params?.get("pedido") || "";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!pedidoId) {
      setLoading(false); // evita loading infinito se não houver pedido
      return;
    }

    async function atualizarStatus() {
      try {
        await fetch(`/api/request/${pedidoId}/status`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "pending" }),
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
      <h1 className="text-2xl font-bold text-yellow-600">⌛ Pagamento pendente</h1>
      <p className="mt-2">
        Seu pedido #{pedidoId} está aguardando confirmação de pagamento.
      </p>
    </div>
  );
}
