import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../.lib/prisma"; // seu cliente Prisma
import { MercadoPagoConfig, Preference } from "mercadopago";


const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    
    const {kit, deliveryDate, observations, quantity, userId } = await req.json();

    if (!kit || !quantity || !userId || !deliveryDate) {
        return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
      }
      
      if (quantity <= 0) {
        return NextResponse.json({ error: "Quantidade inválida" }, { status: 400 });
      }
      

    // 🔹 Buscar produto no banco
    const product = await prisma.product.findUnique({
      where: { id: kit.id },
    });
    

    if (!product) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 });
    }

    if (product.price <= 0) {
        return NextResponse.json({ error: "Preço do produto inválido" }, { status: 400 });
      }

    // 🔹 Criar pedido (Request) no banco
    const request = await prisma.request.create({
      data: {
        user_id: userId,
        product_id: product.id,
        quantity,
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
          email: "teste@teste.com", // ou pegue do seu user se tiver cadastrado
        },
        external_reference: request.id.toString(),
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL}/sucess?pedido=${request.id}`,
          failure: `${process.env.NEXT_PUBLIC_URL}/fail?pedido=${request.id}`,
          pending: `${process.env.NEXT_PUBLIC_URL}/pending?pedido=${request.id}`,
        },
        auto_return: "approved",
      },
    });

    
    return NextResponse.json({ url: result.init_point });
  } catch (err: any) {
    console.error("Erro no checkout:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}