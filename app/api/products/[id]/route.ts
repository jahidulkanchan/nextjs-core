import connectDB from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Product from "../models/Product";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params;

    const singleProduct = await Product.findById(id);

    return NextResponse.json({
      message: "ID received successfully",
      status: 200,
      singleProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch product", details: String(error) },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
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
    return NextResponse.json(
      { error: "Failed to delete product", details: String(error) },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await connectDB();
    const { id } = await context.params; // dynamic id
    const body = await request.json(); // body = { name, price }

    // ✅ Update product (partial or full)
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: body }, // $set ensures only fields sent are updated
      { new: true }, // return updated document
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "PATCH successful",
      updatedProduct,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Update failed", details: String(error) },
      { status: 500 },
    );
  }
}
