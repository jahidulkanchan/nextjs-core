"use client";

import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { deleteProduct } from "./deleteProduct";
import { useRouter } from "next/navigation";
import { revalidatePathClient } from "@/app/lib/revalidate";

export default function HandleDelete({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) return; // prevent double click

    try {
      setIsDeleting(true);
      await deleteProduct(id);
      await revalidatePathClient("/products");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={handleDelete}
      className={`product-delete cursor-pointer ${
        isDeleting ? "pointer-events-none opacity-50" : ""
      }`}
    >
      {isDeleting ? (
        <AiOutlineLoading3Quarters
          size={22}
          className="animate-spin text-red-400"
        />
      ) : (
        <RiDeleteBin6Line className="text-red-400" size={24} />
      )}
    </div>
  );
}
