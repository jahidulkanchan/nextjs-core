"use client";

import { useEffect, useState } from "react";
import { revalidatePathClient } from "@/app/lib/revalidate";
import { useRouter } from "next/navigation";

type Product = {
  name: string;
  price: number;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
};

export default function UpdateProductPopUp({
  isOpen,
  onClose,
  productId,
}: Props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  // 🔥 popup open হলেই fetch
  useEffect(() => {
    if (!isOpen) return;

    const fetchSingleProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        );
        const data = await res.json();
        const product: Product = data.singleProduct;

        setName(product.name);
        setPrice(String(product.price));
      } catch (error) {
        console.error("Fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSingleProduct();
  }, [isOpen, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${productId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            price: Number(price),
          }),
        },
      );

      if (!res.ok) throw new Error("Update failed");
      await revalidatePathClient("/products");
      router.refresh();
      setMessage("✅ Product updated successfully");
      onClose();
    } catch {
      setMessage("❌ Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-sm rounded bg-white p-6 shadow">
        <h2 className="mb-4 text-xl font-bold">Update Product</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Product Name"
              required
            />

            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded border p-2"
              placeholder="Price"
              required
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded border p-2"
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full rounded bg-black p-2 text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        )}

        {message && (
          <p className="mt-4 text-center text-sm font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}
