import connectDB from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Product from "../models/Product";



export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await connectDB();
  const { id } = await context.params;

  const singleProduct = await Product.findById(id);

  return NextResponse.json({
    message: "ID received successfully",
    status: 200,
    singleProduct,
  });
}


export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await connectDB();

  try {
    const { id } = await context.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 },
    );
  }
}



