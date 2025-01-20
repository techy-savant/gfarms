import { NextResponse } from "next/server";
import productsData from "@/utils/products.json";

export async function GET() {
  try {
    return NextResponse.json(productsData.products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
