import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../../.lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ requestId: string }> } // 🔥 Adicione Promise
) {
  try {
    // 🔥 AWAIT nos params
    const { requestId } = await params;
    
    const request = await prisma.request.findUnique({
      where: { id: parseInt(requestId) }, // 🔥 Use requestId (sem params.)
      select: {
        id: true,
        status: true,
        payment_id: true,
        product: {
          select: {
            name: true,
            price: true,
          }
        }
      }
    });

    if (!request) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
    }

    return NextResponse.json({
      request_id: request.id,
      status: request.status,
      payment_id: request.payment_id,
      product_name: request.product?.name
    });
  } catch (error) {
    console.error("Erro ao buscar status:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}