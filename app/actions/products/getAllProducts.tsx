export const getAllProducts = async () => {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`,{
      cache: 'force-cache'
    })
    const { products } = await data.json();
    return products;
  } catch (error) {
    console.log(error);
    return [];
  }
};
