export const deleteProduct = async (id: string): Promise<void> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Delete failed");
  }
};
