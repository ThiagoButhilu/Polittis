import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../.lib/prisma";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    const { kit, deliveryDate, deliveryTime, observations, quantity, userId } =
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
      },
    });

    const preference = new Preference(client);

    // 🔹 Criar preferência no Mercado Pago
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
          email: "teste@teste.com", // pode pegar do seu banco depois
        },
        external_reference: request.id.toString(),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/success?pedido=${request.id}`,
          failure: `${process.env.NEXT_PUBLIC_URL}/failure?pedido=${request.id}`,
          pending: `${process.env.NEXT_PUBLIC_URL}/pending?pedido=${request.id}`,
        },
        auto_return: "approved",
      },
    });

    // ⚠️ resultado vem dentro de result.body
    return NextResponse.json({ url: result.init_point });

  } catch (err: any) {
    console.error("Erro no checkout:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
