import connectDB from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Product, { IProduct } from "./models/Product";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";

  try {
    await connectDB();
    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    }).sort({ _id: -1 });

    return NextResponse.json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}
