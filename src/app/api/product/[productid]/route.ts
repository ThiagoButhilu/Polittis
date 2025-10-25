import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../.lib/prisma";


export async function GET(req: NextRequest, context: unknown) {

  const { productid } = await (context as { params: { productid: string } }).params;

  console.log("Buscando pedido com ID:", productid);


  try {
    const request = await prisma.product.findUnique({
      where: { id: Number(productid) }
    });

    console.log("Pedido encontrado:", request);

    if (!request) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });
    }

    return NextResponse.json(request);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Erro ao buscar pedido:", errorMessage);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

