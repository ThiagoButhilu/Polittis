import { NextResponse } from "next/server";
import { prisma } from "../../../../.lib/prisma";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const typeStr = formData.get("type") as string;
  const images = formData.getAll("images") as File[];
  const category = formData.get("category") as string;

  const type = typeStr === "CUSTOM" ? "CUSTOM" : "SIMPLE";

  let quantity: number | null = null;
  if (type === "SIMPLE") {
    quantity = parseInt(formData.get("quantity") as string) || 1;
  }

  const product = await prisma.product.create({
    data: {
      name,
      description,
      quantity,
      category,
      price,
      type,
      image_url: "",
      components: { create: [] },
    },
  });

  if (type === "CUSTOM") {
    const componentsRaw = formData.get("kitItems");
    const components: { name: string; quantity: number }[] = componentsRaw
      ? JSON.parse(componentsRaw as string)
      : [];

    if (components.length > 0) {
      await prisma.productComponent.createMany({
        data: components.map((comp) => ({
          product_id: product.id,
          name: comp.name,
          quantity: comp.quantity,
        })),
      });
    }
  }

  const imageUrls: string[] = [];
  for (const file of images) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${product.id}-${Date.now()}-${file.name}`;

    const blob = await put(`product/${product.id}/${filename}`, buffer, {
      access: "public",
    });

    imageUrls.push(blob.url);
  }

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

