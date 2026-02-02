"use client";
import { revalidatePathClient } from "@/app/lib/revalidate";
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !price || isNaN(Number(price))) {
      setMessage("Please enter valid name and price");
      return;
    }

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
        await revalidatePathClient("/products");
        router.push("/products");
      } else {
        setMessage(result.error || "Failed to add product");
      }
    } catch (err: unknown) {
      setMessage(
        err instanceof Error
          ? "Error: " + err.message
          : "An unexpected error occurred",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black sm:text-4xl">
            Add New Product
          </h1>
          <p className="mt-2 text-gray-600">
            Fill in the details below to add a new product to your inventory
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-xl border border-black bg-white p-6 shadow-lg sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name Field */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Product Name
                <span className="ml-1 text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                className="w-full rounded-lg border border-black px-4 py-3 text-black placeholder-gray-500 transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                required
                disabled={isLoading}
                aria-label="Product name"
              />
            </div>

            {/* Price Field */}
            <div>
              <label
                htmlFor="price"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Price
                <span className="ml-1 text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  className="w-full rounded-lg border border-black py-3 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-30 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  required
                  disabled={isLoading}
                  aria-label="Product price"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Enter price in USD (e.g., 29.99)
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center rounded-lg bg-black px-6 py-4 text-white transition-all duration-200 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-600"
                aria-label={isLoading ? "Adding product..." : "Add product"}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="mr-3 h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span className="font-medium">Processing...</span>
                  </>
                ) : (
                  <span className="flex items-center font-medium">
                    <svg
                      className="mr-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Product
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Message Display */}
          {message && (
            <div
              className={`mt-6 rounded-lg border p-4 text-center ${
                message.includes("success")
                  ? "border-green-200 bg-green-50 text-green-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
              role="alert"
            >
              <p className="font-medium">{message}</p>
            </div>
          )}

          {/* Additional Information */}
          <div className="mt-8 border-t border-gray-200 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="text-center sm:text-left">
                <h3 className="text-sm font-medium text-gray-700">
                  Need to manage existing products?
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  View and edit all products in your inventory
                </p>
              </div>
              <button
                type="button"
                onClick={() => router.push("/products")}
                className="inline-flex items-center justify-center rounded-lg border border-black bg-white px-4 py-2 text-sm font-medium text-black transition-all duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                aria-label="View all products"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
                View All Products
              </button>
            </div>
          </div>
        </div>

        {/* Responsive Tips */}
        <div className="mt-8 rounded-lg bg-gray-50 p-4 sm:p-6">
          <div className="flex items-start">
            <svg
              className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-gray-700">
                Quick Tips for Adding Products
              </h4>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Use descriptive names for better searchability</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Include currency symbol when entering prices</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>All fields marked with * are required</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}