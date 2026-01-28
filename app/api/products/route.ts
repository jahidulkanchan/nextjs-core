import connectDB from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Product, { IProduct } from "./models/Product";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  await connectDB();

  try {
    const body = await request.json();

    // Validate incoming data
    if (!body.name || !body.price) {
      return NextResponse.json(
        { error: "Missing name or price" },
        { status: 400 },
      );
    }

    const newProduct: IProduct = new Product({
      name: body.name,
      price: Number(body.price),
    });

    await newProduct.save();

    revalidatePath('/collections')

    return NextResponse.json({
      message: "Product saved successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to save product" },
      { status: 500 },
    );
  }
}

export async function GET() {
  await connectDB();

  try {
    const products = await Product.find();

    return NextResponse.json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

