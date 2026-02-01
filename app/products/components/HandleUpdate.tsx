"use client";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";

// Popup Modal Component
function UpdateProductPopup({ 
  isOpen, 
  onClose, 
  productId 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  productId: string;
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your update logic here
    console.log("Updating product:", { productId, name, price });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-sm rounded-md border border-black bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Update Product</h1>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Product Name"
            className="rounded border border-black px-3 py-2 text-black placeholder-gray-500 focus:ring-1 focus:ring-black focus:outline-none disabled:opacity-50"
            required
            disabled={isLoading}
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="rounded border border-black px-3 py-2 text-black placeholder-gray-500 focus:ring-1 focus:ring-black focus:outline-none disabled:opacity-50"
            required
            disabled={isLoading}
          />
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 rounded border border-black bg-white py-2 text-black transition-colors hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex flex-1 items-center justify-center rounded bg-black py-2 text-white transition-colors hover:bg-gray-800 disabled:bg-gray-600"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-center font-medium text-black">{message}</p>
        )}
      </div>
    </div>
  );
}

// Main Component
export default function HandleUpdate({ id }: { id: string }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleUpdate = () => {
    console.log("Edit product ID:", id);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div 
        className="cursor-pointer hover:text-blue-600 transition-colors" 
        onClick={handleUpdate}
        title="Edit Product"
      >
        <FaRegEdit size={24} />
      </div>

      <UpdateProductPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        productId={id}
      />
    </>
  );
}