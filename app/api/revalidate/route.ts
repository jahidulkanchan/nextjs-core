import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  const { path = "/products" } = await req.json();
  revalidatePath(path);
  return NextResponse.json({ message: `Revalidated ${path}` });
}
