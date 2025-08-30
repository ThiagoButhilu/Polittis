import { NextResponse } from "next/server";
import { prisma } from "../../../../.lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function POST(req: Request) {
  console.log("Received request:", req);
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const typeStr = formData.get("type") as string; // vem do form como string
  const images = formData.getAll("images") as File[];

  // Converte string para valores válidos do schema
  const type = typeStr === "CUSTOM" ? "CUSTOM" : "SIMPLE";

  let quantity: number | null = null;
  if (type === "SIMPLE") {
    quantity = parseInt(formData.get("quantity") as string) || 1;
  }

  // 1️⃣ Criar o produto no banco primeiro
  const product = await prisma.product.create({
    data: {
      name,
      description,
      category: "",
      price,
      type,
      image_url: "",
      components: { create: [] },
    },
  });

  // 2️⃣ Criar pasta do produto
  const productDir = path.join(process.cwd(), "public/product", product.id.toString());
  await fs.mkdir(productDir, { recursive: true });

  // 3️⃣ Salvar imagens dentro da pasta do produto
  const imageUrls: string[] = [];
  for (const file of images) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${Date.now()}-${file.name}`;
    const filePath = path.join(productDir, filename);
    await fs.writeFile(filePath, buffer);
    imageUrls.push(`/product/${product.id}/${filename}`);
  }

  // 4️⃣ Atualizar o produto com a primeira imagem como imagem principal
  if (imageUrls.length > 0) {
    await prisma.product.update({
      where: { id: product.id },
      data: { image_url: imageUrls[0] },
    });
  }

  return NextResponse.json({
    product,
    images: imageUrls,
    quantity: type === "SIMPLE" ? quantity : undefined,
  });
}



export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!type || (type !== "SIMPLE" && type !== "CUSTOM")) {
    return NextResponse.json({ error: "Invalid or missing type parameter" }, { status: 400 });
  }

  const products = await prisma.product.findMany({
    where: { type },
    include: { components: true },
  });

  return NextResponse.json({ products });
}
