import React from "react";

export default async function page() {
    const data = await fetch(`${process.env.BASE_URL}/products`)
    const {products} = await data.json()
    console.log(products)
  return (
    <>
      <section>
        <div className="container flex justify-center items-center min-h-screen">
          I am new products page
        </div>
      </section>
    </>
  );
}
