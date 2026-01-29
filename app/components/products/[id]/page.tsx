import React from "react";
import Image from "next/image";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

export default function Page() {
  return (
    <section className="min-h-screen bg-white text-black">
      <div className="container mx-auto px-5 py-16">
        {/* Go Back */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm mb-8 hover:underline"
        >
          <IoArrowBack size={18} />
          Go Back
        </Link>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative">
            <Image
              src="/window.svg"
              alt="Product name"
              fill
              className="object-cover"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <h1 className="text-2xl font-semibold">Product Name</h1>

            <p className="text-xl font-medium">$49.99</p>

            <p className="text-sm text-gray-600 leading-relaxed">
              This is the product description. Clean, minimal, and easy to read.
              Keep it short and informative just like your cards.
            </p>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition">
                Add to Cart
              </button>

              <button className="border border-black px-6 py-3 rounded hover:bg-black hover:text-white transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
