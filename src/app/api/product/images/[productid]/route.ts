import { NextRequest, NextResponse } from "next/server";
import { list } from "@vercel/blob";

export async function GET(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const parts = pathname.split("/");
  const productid = parts[parts.length - 1];

  if (!productid) {
    return NextResponse.json({ images: [] }, { status: 400 });
  }

  try {
    const prefix = `product/${productid}/`;

    const { blobs } = await list({
      prefix,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    const imageUrls = blobs.map((blob) => blob.url);

    return NextResponse.json({ images: imageUrls });
  } catch (error) {
    console.error("Erro ao listar imagens:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}