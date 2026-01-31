"use client";
import { useRouter } from "next/navigation";
import React, { useState, FormEvent } from "react";

interface ApiResponse {
  message: string;
  product?: {
    _id: string;
    name: string;
    price: number;
  };
  error?: string;
}

export default function AddProducts() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  // 1. Add loading state
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !price || isNaN(Number(price))) {
      setMessage("Please enter valid name and price");
      return;
    }

    // 2. Start loading
    setIsLoading(true);
    const data = { name, price: Number(price) };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result: ApiResponse = await res.json();

      if (res.ok) {
        setMessage(result.message || "Product added successfully!");
        setName("");
        setPrice("");

        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: "/products" }),
        });

        router.push('/');
      } else {
        setMessage(result.error || "Failed to add product");
      }
    } catch (err: unknown) {
      setMessage(err instanceof Error ? "Error: " + err.message : "An unexpected error occurred");
    } finally {
      // 3. Stop loading regardless of success or error
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm p-6 border border-black rounded-md shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">
          Add Product
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="border border-black text-black placeholder-black rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
            required
            disabled={isLoading} // 4. Disable inputs while loading
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border border-black text-black placeholder-black rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading} // 5. Disable button and show spinner
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors flex items-center justify-center disabled:bg-gray-600"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              "Add Product"
            )}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-black font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}