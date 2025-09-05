import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { productId } = req.query;

  const dirPath = path.join(process.cwd(), "public", String(productId));

  try {
    const files = fs.readdirSync(dirPath);

    const images = files.filter((file) =>
      /\.(png|jpe?g|webp|gif)$/i.test(file)
    );

    const imageUrls = images.map((file) => `/${productId}/${file}`);

    res.status(200).json({ images: imageUrls });
  } catch (error) {
    console.error("Erro ao listar imagens:", error);
    res.status(500).json({ images: [] });
  }
}
