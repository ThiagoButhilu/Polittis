import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../../../.lib/prisma";

export async function PATCH(req: NextRequest, context: unknown) {
  // Fazemos um type assertion seguro aqui
  const { requestid } = (context as { params: { requestid: string } }).params;

  try {
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: "Status obrigatório" }, { status: 400 });
    }

    const updated = await prisma.request.update({
      where: { id: Number(requestid) },
      data: { status },
      include: { product: true },
    });

    if (updated.product.type === "CUSTOM") {
      await prisma.product.update({
        where: { id: updated.product.id },
        data: { quantity: { decrement: 1 } },
      });
    }

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Erro ao atualizar pedido:", errorMessage);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
