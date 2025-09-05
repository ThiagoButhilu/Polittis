import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(req: NextRequest) {
  // Pega o productid da URL
  const { pathname } = new URL(req.url);
  const parts = pathname.split("/");
  const productid = parts[parts.length - 1];

  if (!productid) {
    return NextResponse.json({ images: [] }, { status: 400 });
  }

  const dirPath = path.join(process.cwd(), "public", productid);

  try {
    const files = fs.readdirSync(dirPath);

    const images = files.filter((file) =>
      /\.(png|jpe?g|webp|gif)$/i.test(file)
    );

    const imageUrls = images.map((file) => `/${productid}/${file}`);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error("Erro ao listar imagens:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}
