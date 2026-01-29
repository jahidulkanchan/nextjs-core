import React, { Suspense } from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import path from "path";
import fs from "fs/promises";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { search?: string };
}) {
  const search = searchParams?.search?.toLowerCase() || "";

  // Server-side fetch from public folder
  const jsonFilePath = path.join(process.cwd(), "public", "products.json");
  const fileData = await fs.readFile(jsonFilePath, "utf-8");
  const products: Product[] = JSON.parse(fileData);

  // Filter logic
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search)
  );

  return (
    <div className="bg-white text-black antialiased">
      <section className="container mx-auto px-4 py-16 md:px-8 min-h-screen">
        {/* Header + Search */}
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <Suspense fallback={<div>Loading Search...</div>}>
            <SearchBar />
          </Suspense>
        </div>

        <div className="h-px bg-gray-200 w-full mb-12" />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group border border-gray-100 p-2 rounded-lg hover:border-black transition-all"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-100 relative cursor-pointer">
                    <Image
                      fill
                      src={product.image}
                      alt={product.name}
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-2 space-y-2">
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-sm">{product.name}</span>
                    <span className="text-sm">${product.price.toFixed(2)}</span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="bg-black text-white text-sm px-4 py-2 rounded hover:bg-gray-800 transition"
                    >
                      View Details
                    </Link>

                    <button
                      className="p-2 rounded-full border hover:bg-black hover:text-white transition"
                      aria-label="Add to cart"
                    >
                      <FaShoppingCart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No results found for <span className="font-medium">{search}</span>
          </div>
        )}
      </section>
    </div>
  );
}
