import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../.lib/prisma";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { kit, deliveryDate, deliveryTime, observations, quantity, userId, userEmail } =
      await req.json();

    if (!kit || !quantity || !userId || !deliveryDate) {
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    if (quantity <= 0) {
      return NextResponse.json({ error: "Quantidade inválida" }, { status: 400 });
    }

    // 🔹 Buscar produto
    const product = await prisma.product.findUnique({
      where: { id: kit.id },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    if (product.price <= 0) {
      return NextResponse.json(
        { error: "Preço do produto inválido" },
        { status: 400 }
      );
    }

    // 🔹 Criar pedido no banco
    const request = await prisma.request.create({
      data: {
        user_id: userId,
        product_id: product.id,
        quantity,
        observation: observations,
        delivery_date: new Date(deliveryDate),
        delivery_time: deliveryTime,
        price: product.price * quantity,
        status: "pending",
        payment_id: null, // Vamos preencher depois pelo webhook
      },
    });

    const preference = new Preference(client);

    // 🔹 Criar preferência no Mercado Pago COM WEBHOOK
    const result = await preference.create({
      body: {
        items: [
          {
            id: product.id.toString(),
            title: product.name,
            unit_price: product.price,
            quantity,
          },
        ],
        payer: {
          email: userEmail || "customer@example.com", // Use o email real do usuário
        },
        external_reference: request.id.toString(),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/payment/success?request_id=${request.id}`,
          failure: `${process.env.NEXT_PUBLIC_URL}/payment/failure?request_id=${request.id}`,
          pending: `${process.env.NEXT_PUBLIC_URL}/payment/pending?request_id=${request.id}`,
        },
        auto_return: "approved",
        notification_url: `${process.env.NEXT_PUBLIC_URL}/api/webhooks/mercadopago`, // 🔥 IMPORTANTE
        payment_methods: {
          excluded_payment_types: [
            // Opcional: excluir métodos se quiser forçar PIX
            // { id: "credit_card" },
            // { id: "debit_card" }
          ],
          installments: 1
        },
      },
    });

    // Retorne o ID do pagamento também para o frontend fazer polling
    return NextResponse.json({ 
      url: result.init_point,
      payment_id: result.id,
      request_id: request.id 
    });

  } catch (err: unknown) {
    let message = "Erro desconhecido";
  
    if (err instanceof Error) {
      message = err.message;
    }
  
    console.error("Erro no checkout:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}