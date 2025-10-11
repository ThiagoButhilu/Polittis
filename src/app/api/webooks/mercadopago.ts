import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../.lib/prisma";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { RequestStatus } from "@prisma/client";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    console.log("Webhook recebido:", body);

    if (body.type === "payment") {
      const paymentId = body.data.id;
      
      const payment = new Payment(client);
      const paymentDetails = await payment.get({ id: paymentId });
      
      const requestId = paymentDetails.external_reference;
      const status = paymentDetails.status;

      // Mapear status do Mercado Pago para seu sistema
      let requestStatus: RequestStatus = "pending";
      if (status === "approved") requestStatus = "paid";
      else if (status === "rejected") requestStatus = "canceled";
      else if (status === "cancelled") requestStatus = "canceled";
      else if (status === "in_process") requestStatus = "processing";

      // Atualizar pedido no banco
      await prisma.request.update({
        where: { id: requestId ? parseInt(requestId) : 0 },
        data: { 
          status: requestStatus,
          payment_id: paymentId.toString(),
          updated_at: new Date()
        },
      });

      console.log(`Pedido ${requestId} atualizado para: ${requestStatus}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}