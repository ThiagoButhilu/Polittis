import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/../../.lib/prisma";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: "Status obrigatório" }, { status: 400 });
    }

    const updated = await prisma.request.update({
      where: { id: Number(params.id) },
      data: { status },
      include: { product: true },
    });

    if(updated.product.type === "CUSTOM") {
      const updatedProduct = await prisma.product.update({
        where: { id: updated.product.id },
        data: { quantity: { decrement: 1 } },
      });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("Erro ao atualizar pedido:", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}