import { NextResponse } from "next/server";
import { prisma } from "../../../../../.lib/prisma";
import { promises as fs } from "fs";
import path from "path";

export async function DELETE(req: Request, { params }: { params: { id: number } }) {
    const { id } = params;
  
    if (!id) {
      return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
    }
  
    try {
      const product = await prisma.product.findUnique({ where: { id } });
  
      if (!product) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
      }
  
      if (product.image_url) {
        const productDir = path.join(process.cwd(), "public/product", id.toString());
        await fs.rm(productDir, { recursive: true, force: true });
      }
  
      await prisma.productComponent.deleteMany({ where: { product_id: id } });
  
      await prisma.product.delete({ where: { id } });
  
      return NextResponse.json({ message: "Product deleted successfully" });
    } catch (error) {
      console.error("Error deleting product:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }