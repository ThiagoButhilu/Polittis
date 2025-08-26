// src/app/api/user/address/route.ts
import { NextResponse } from "next/server";
import { prisma } from "../../../../../.lib/prisma"; // ajustado o caminho do import
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  console.log("GET request received for user address");
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      console.log("Usuário não autenticado");
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    // Busca o usuário e já inclui o endereço relacionado
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { addresses: true }, // pega o endereço junto
    });

    if (!user || !user.addresses) {
      return NextResponse.json(
        { error: "Endereço não encontrado" },
        { status: 404 }
      );
    }

    // user.address pode ser único ou uma lista, depende do seu schema
    const allData = { user, addresses: user.addresses };

    return NextResponse.json(allData);
  } catch (error) {
    console.error("Erro ao buscar endereço:", error);
    return NextResponse.json(
      { error: "Erro ao buscar endereço" },
      { status: 500 }
    );
  }
}
