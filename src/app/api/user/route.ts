'use server'

import { Phone } from "lucide-react";
import { prisma } from "../../../../.lib/prisma";
import bcrypt from "bcrypt";

// ================== GET ==================
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        addresses: true, // já traz os endereços junto
      },
    });

    return Response.json(users, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error.message);
    return Response.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

// ================== POST ==================
export async function POST(req: Request) {
  try {
    const data = await req.json();
    console.log("Data received:", data);

    // Verifica se email já existe
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      console.log("User already exists with this email");
      return Response.json(
        { message: "Usuário já existe!" },
        { status: 400 }
      );
    }

    // Criptografa a senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    console.log("Hashed password:", hashedPassword);

    // Cria usuário + endereço em uma única transação
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        addresses: {
          create: {
            street: data.street,
            number: data.number,
            comp: data.complement,
            cep: data.zip,
            state: data.state,
            city: data.city,
            district: data.district,
          },
        },
      },
      include: { addresses: true }, // retorna também o endereço criado
    });

    console.log("User created:", user);

    return Response.json(
      { message: "User and address created successfully", user },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating user and address:", error.message);
    return Response.json(
      { error: error.message, message: "Failed to create user and address" },
      { status: 400 }
    );
  }
}
