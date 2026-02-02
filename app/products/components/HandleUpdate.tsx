"use client";

import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import UpdateProductPopup from "./UpdateProductPopUp";



export default function HandleUpdate({ id }: { id: string }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div
        className="cursor-pointer hover:text-blue-600"
        onClick={() => setIsPopupOpen(true)}
        title="Edit Product"
      >
        <FaRegEdit size={24} />
      </div>

      <UpdateProductPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        productId={id}
      />
    </>
  );
}
