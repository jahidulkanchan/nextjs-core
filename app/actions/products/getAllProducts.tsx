export const getAllProducts = async (search = "") => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products?search=${search}`,
      { cache: "force-cache" }
    );

    const { products } = await res.json();
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};
