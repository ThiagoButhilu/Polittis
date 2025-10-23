import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../.lib/prisma";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { RequestStatus } from "@prisma/client";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    console.log("🔔 WEBHOOK INICIADO");
    
    const body = await req.json();
    console.log("📦 BODY RECEBIDO:", JSON.stringify(body, null, 2));

    if (body.type === "payment") {
      const paymentId = body.data.id;
      console.log("💰 ID DO PAGAMENTO:", paymentId);
      
      const payment = new Payment(client);
      console.log("🔍 BUSCANDO DETALHES DO PAGAMENTO...");
      
      const paymentDetails = await payment.get({ id: paymentId });
      console.log("📊 DETALHES DO PAGAMENTO:", {
        status: paymentDetails.status,
        external_reference: paymentDetails.external_reference,
        id: paymentDetails.id
      });
      
      const requestId = paymentDetails.external_reference;
      const status = paymentDetails.status;

      console.log("🆔 REQUEST ID:", requestId);
      console.log("📋 STATUS MP:", status);

      // Mapear status do Mercado Pago para seu sistema
      let requestStatus: RequestStatus = "pending";
      if (status === "approved") requestStatus = "paid";
      else if (status === "rejected") requestStatus = "canceled";
      else if (status === "cancelled") requestStatus = "canceled";
      else if (status === "in_process") requestStatus = "processing";

      console.log("🎯 STATUS CONVERTIDO:", requestStatus);

      // Verificar se requestId é válido
      if (!requestId) {
        console.error("❌ REQUEST ID NÃO ENCONTRADO");
        return NextResponse.json({ error: "Request ID not found" }, { status: 400 });
      }

      // Atualizar pedido no banco
      console.log("💾 ATUALIZANDO BANCO DE DADOS...");
      await prisma.request.update({
        where: { id: parseInt(requestId) },
        data: { 
          status: requestStatus,
          payment_id: paymentId.toString(),
          updated_at: new Date()
        },
      });

      console.log(`✅ Pedido ${requestId} atualizado para: ${requestStatus}`);
    } else {
      console.log("⚠️  Tipo de webhook não é 'payment':", body.type);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("❌ ERRO NO WEBHOOK:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}