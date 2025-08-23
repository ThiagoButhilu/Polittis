import { NextResponse } from "next/server";
import { apiGet } from "../../database"; // ajusta o caminho
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
    console.log("GET request received for user address");
    try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.log("Usuário não autenticado");
      return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }
    
    const query = `SELECT *
                   FROM user WHERE email = ? LIMIT 1`;
    const result: any = await apiGet(query, [session.user.email]);

    const queryAddress = `SELECT * FROM address WHERE user_id = ? LIMIT 1`;
    const addressResult: any = await apiGet(queryAddress, [result[0].id]);

    const allData = { user: result[0], address: addressResult[0] };


    if (!allData.user || !allData.address) {
      return NextResponse.json({ error: "Endereço não encontrado" }, { status: 404 });
    }

    return NextResponse.json(allData);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erro ao buscar endereço" }, { status: 500 });
  }
}
