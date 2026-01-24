import React, { Suspense } from "react";
import SearchBar from "./SearchBar";
import Image from "next/image";

const products = [
  { id: 1, name: "Minimalist Leather Tote", price: 120.0, description: "Handcrafted from premium full-grain leather.", image: "https://images.unsplash.com/photo-1544816155-12df9643f363" },
  { id: 2, name: "Series 01 Timepiece", price: 350.0, description: "Automatic movement with a sapphire crystal face.", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30" },
  { id: 3, name: "Ceramic Coffee Set", price: 45.0, description: "Matte finish stoneware, dishwasher safe.", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd" },
  { id: 4, name: "Organic Cotton Hoodie", price: 85.0, description: "Heavyweight fabric with a relaxed, modern fit.", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7" }
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedParams = await searchParams;
  console.log(resolvedParams.search)
  const search = resolvedParams?.search || "";

  // ফিল্টারিং লজিক
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search));

  return (
    <div className="bg-white text-black antialiased">
      <section className="container mx-auto px-4 py-16 md:px-8 min-h-screen">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          {/* আমরা চাই সার্চবারে টাইপ করার সাথে সাথে URL পরিবর্তন হোক */}
          <Suspense fallback={<div>Loading Search...</div>}>
            <SearchBar />
          </Suspense>
        </div>
        
        <div className="h-px bg-gray-200 w-full mb-12" />

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group border border-gray-100 p-2 rounded-lg hover:border-black transition-all">
                <div className="aspect-square overflow-hidden rounded-md bg-gray-100 relative">
                  <Image
                    fill
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover transition-transform group-hover:scale-105" 
                  />
                </div>
                <div className="p-2 space-y-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-sm">{product.name}</span>
                    <span className="text-sm">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2">{product.description}</p>
                  <button className="w-full bg-black text-white text-sm py-2 rounded mt-2">Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No results found for {search}
          </div>
        )}
      </section>
    </div>
  );
}