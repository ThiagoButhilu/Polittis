'use server'

import { prisma } from "../../../../.lib/prisma";
// importa o Prisma Client
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  console.log("POST request received for user authentication");

  let status = 500;
  let body: any = {};

  try {
    const data = await req.json();
    console.log("Data received for authentication:", data);

    // Busca o usuário pelo email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true, password: true }, 
    });

    if (user) {
      const isMatch = await bcrypt.compare(data.password, user.password);
      console.log("Password match:", isMatch);

      if (isMatch) {
        status = 200;
        body = { message: "Login successful", userId: user.id };
      } else {
        status = 401;
        body = { message: "Login failed" };
      }
    } else {
      status = 404;
      body = { message: "User not found" };
    }

    console.log("Response body:", body);
    return Response.json(body, { status });

  } catch (error: any) {
    console.error("Error:", error);
    return Response.json(
      { error: error.message || "Unexpected error" },
      { status: 500 }
    );
  }
}
