"use client";
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
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate price is a number
    if (!name || !price || isNaN(Number(price))) {
      setMessage("Please enter valid name and price");
      return;
    }

    const data = { name, price: Number(price) }; // ensure price is a number

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
        window.location.href = "/";
      } else {
        setMessage(result.error || "Failed to add product");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage("Error: " + err.message);
      } else {
        setMessage("An unexpected error occurred");
      }
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
            className="border border-black text-black placeholder-black rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="border border-black text-black placeholder-black rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
          >
            Add Product
          </button>
        </form>
        {message && (
          <p className="mt-4 text-center text-black font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
