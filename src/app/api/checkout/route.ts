import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../.lib/prisma";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: NextRequest) {
  try {
    console.log("🔵 [CHECKOUT] Iniciando processo de checkout...");
    
    const body = await req.json();
    console.log("📦 [CHECKOUT] Dados recebidos:", JSON.stringify(body, null, 2));

    const { kit, deliveryDate, deliveryTime, observations, quantity, userId } = body;

    // 🔹 Validações
    if (!kit || !quantity || !userId || !deliveryDate) {
      console.log("❌ [CHECKOUT] Dados incompletos:", { kit, quantity, userId, deliveryDate });
      return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
    }

    if (quantity <= 0) {
      console.log("❌ [CHECKOUT] Quantidade inválida:", quantity);
      return NextResponse.json({ error: "Quantidade inválida" }, { status: 400 });
    }

    console.log("🔍 [CHECKOUT] Buscando produto ID:", kit.id);

    // 🔹 Buscar produto
    const product = await prisma.product.findUnique({
      where: { id: kit.id },
    });

    if (!product) {
      console.log("❌ [CHECKOUT] Produto não encontrado ID:", kit.id);
      return NextResponse.json(
        { error: "Produto não encontrado" },
        { status: 404 }
      );
    }

    console.log("✅ [CHECKOUT] Produto encontrado:", product.name, "- Preço:", product.price);

    if (product.price <= 0) {
      console.log("❌ [CHECKOUT] Preço do produto inválido:", product.price);
      return NextResponse.json(
        { error: "Preço do produto inválido" },
        { status: 400 }
      );
    }

    const totalPrice = product.price * quantity;
    console.log("💰 [CHECKOUT] Calculando preço total:", `${product.price} x ${quantity} = ${totalPrice}`);

    // 🔹 Criar pedido no banco
    console.log("💾 [CHECKOUT] Criando pedido no banco...");
    const request = await prisma.request.create({
      data: {
        user_id: userId,
        product_id: product.id,
        quantity,
        observation: observations || "",
        delivery_date: new Date(deliveryDate),
        delivery_time: deliveryTime,
        price: totalPrice,
        status: "pending",
      },
    });

    console.log("✅ [CHECKOUT] Pedido criado com ID:", request.id);

    const preference = new Preference(client);

    // Configurar URLs
    const successUrl = `${process.env.NEXT_PUBLIC_URL}/success?pedido=${request.id}`;
    const failureUrl = `${process.env.NEXT_PUBLIC_URL}/failure?pedido=${request.id}`;
    const pendingUrl = `${process.env.NEXT_PUBLIC_URL}/pending?pedido=${request.id}`;
    const webhookUrl = "https://unfixated-transcalent-amirah.ngrok-free.dev/api/webhooks/mercadopago";

    console.log("🔗 [CHECKOUT] URLs configuradas:", {
      success: successUrl,
      failure: failureUrl,
      pending: pendingUrl,
      webhook: webhookUrl
    });

    // 🔹 Criar preferência no Mercado Pago
    console.log("🔄 [CHECKOUT] Criando preferência no Mercado Pago...");
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
          email: "thiago.araujorodrigues@gmail.com",
        },
        external_reference: request.id.toString(),
        back_urls: {
          success: successUrl,
          failure: failureUrl,
          pending: pendingUrl,
        },
        auto_return: "approved",
        notification_url: webhookUrl,
      },
    });

    console.log("✅ [CHECKOUT] Preferência criada com sucesso!");
    console.log("🔗 [CHECKOUT] URL do checkout:", result.init_point);
    console.log("🆔 [CHECKOUT] ID da preferência:", result.id);

    // ⚠️ resultado vem dentro de result.body
    return NextResponse.json({ 
      url: result.init_point,
      preference_id: result.id,
      request_id: request.id 
    });

  } catch (err: unknown) {
    let message = "Erro desconhecido";
  
    if (err instanceof Error) {
      message = err.message;
    }
  
    console.error("❌ [CHECKOUT] Erro no checkout:", err);
    console.error("📋 [CHECKOUT] Stack trace:", err instanceof Error ? err.stack : "No stack");
    
    return NextResponse.json({ error: message }, { status: 500 });
  }
}