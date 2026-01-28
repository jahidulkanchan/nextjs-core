import React from "react";
import Image from "next/image";
import { HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";

// 1. Static Mock Data
const MOCK_PRODUCT = {
  _id: "65b2f1a2e4b0a123456789ab",
  name: "Signature Minimalist Watch",
  price: 249.00,
  category: "Lifestyle",
  description: "Experience the perfect blend of craftsmanship and modern design. This piece from our latest collection is designed for those who appreciate the finer details and long-lasting quality. Crafted with premium materials and a focus on essential form.",
  imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=684&auto=format&fit=crop"
};

interface PageProps {
  params: { id: string };
}

export default function ProductDetails({ params }: PageProps) {
  // 2. Using static data instead of fetch for now
  const product = MOCK_PRODUCT;

  return (
    <main className="bg-white text-stone-900 min-h-screen">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          
          {/* Back Button */}
          <Link
            href="/collections"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors mb-8 group"
          >
            <HiOutlineArrowLeft className="transition-transform group-hover:-translate-x-1" /> 
            Back to Collection
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24">
            
            {/* Left: Image Gallery */}
            <div className="relative aspect-[4/5] w-full bg-stone-100 rounded-2xl overflow-hidden shadow-sm">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Right: Product Details */}
            <div className="flex flex-col justify-center">
              <div className="border-b border-stone-100 pb-8 mb-8">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-400 mb-4">
                  Premium {product.category}
                </h3>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-stone-900">
                  {product.name}
                </h1>
                <p className="text-2xl font-light text-stone-600">
                  ${product.price.toLocaleString()}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase mb-2 text-stone-900">Description</h4>
                  <p className="text-stone-500 leading-relaxed max-w-md">
                    {product.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-4 pt-8 max-w-sm">
                  <button className="w-full bg-stone-900 text-white py-4 rounded-full font-medium hover:bg-stone-800 transition-all active:scale-[0.98] shadow-lg shadow-stone-200">
                    Add to Cart
                  </button>
                  <button className="w-full border border-stone-200 text-stone-900 py-4 rounded-full font-medium hover:bg-stone-50 transition-all">
                    Add to Wishlist
                  </button>
                </div>

                {/* Metadata */}
                <div className="pt-12 border-t border-stone-100 grid grid-cols-2 gap-4 text-[10px] uppercase tracking-[0.15em] text-stone-400">
                  <div>
                    <span className="block font-bold text-stone-600">SKU</span>
                    #PRD-{product._id.toString().slice(-6)}
                  </div>
                  <div>
                    <span className="block font-bold text-stone-600">Availability</span>
                    In Stock
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}