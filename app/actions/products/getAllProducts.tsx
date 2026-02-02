export const getAllProducts = async (search = "") => {
  const isSearch = search.length > 0;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products?search=${search}`,
    {
      cache: isSearch ? "no-store" : "force-cache",
    }
  );

  const { products } = await res.json();
  return products;
};
