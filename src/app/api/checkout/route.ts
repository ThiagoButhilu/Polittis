import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../.lib/prisma"; // seu cliente Prisma
import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN!, // coloque no .env
});

export async function POST(req: NextRequest) {
  try {
    const { productId, quantity, userId } = await req.json();

    // 🔹 Buscar produto no banco
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    // 🔹 Criar pedido (Request) no banco
    const request = await prisma.request.create({
      data: {
        user_id: userId,
        product_id: productId,
        quantity,
        price: product.price * quantity,
        status: "pending",
      },
    });

    // 🔹 Criar preferência no Mercado Pago
    const preference = await mercadopago.preferences.create({
      items: [
        {
          title: product.name,
          unit_price: product.price,
          quantity,
        },
      ],
      payer: {
        id: userId.toString(), // opcional
      },
      external_reference: request.id.toString(), // ID do pedido
      back_urls: {
        success: `${process.env.NEXT_PUBLIC_URL}/sucesso?pedido=${request.id}`,
        failure: `${process.env.NEXT_PUBLIC_URL}/falha?pedido=${request.id}`,
        pending: `${process.env.NEXT_PUBLIC_URL}/pendente?pedido=${request.id}`,
      },
      auto_return: "approved",
    });

    return NextResponse.json({ url: preference.body.init_point });
  } catch (err: any) {
    console.error("Erro no checkout:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
