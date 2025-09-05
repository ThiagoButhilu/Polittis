import { NextResponse, NextRequest } from "next/server";

import { prisma } from "../../../../../.lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function DELETE(req: NextRequest) {
      const { pathname } = new URL(req.url);
      // pathname = /api/product/123
      const parts = pathname.split("/");
      const productid = parts[parts.length - 1];

    if (!productid) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }
  
    try {
      const product = await prisma.product.findUnique({ where: { id: Number(productid) } });
  
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
  
      if (product.image_url) {
        const productDir = path.join(process.cwd(), "public/product", productid.toString());
        await fs.rm(productDir, { recursive: true, force: true });
      }

      await prisma.productComponent.deleteMany({ where: { product_id: Number(productid) } });

      await prisma.product.delete({ where: { id: Number(productid) } });

      return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }