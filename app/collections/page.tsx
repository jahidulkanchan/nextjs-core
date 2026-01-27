import React from "react";
import { IProduct } from "../api/products/models/Product";

export default async function page() {
  const data = await fetch(`${process.env.BASE_URL}/products`, {
    cache: "force-cache",
  });
  const { products } = await data.json();
  console.log(products);
  return (
    <>
      <section>
        <div className="container grid grid-cols-3 w-full gap-10 min-h-screen">
          {products.length > 0 ? (
            <>
              {products.map((product: IProduct, index: number) => (
                <div
                  key={index}
                  className="card bg-slate-200 p-5 text-black rounded-2xl"
                >
                  <h2>{product.name}</h2>
                  <h2>{product.price}</h2>
                </div>
              ))}
            </>
          ) : (
            <p className="flex justify-center items-center min-h-screen text-center col-span-3">No Product Found</p>
          )}
        </div>
      </section>
    </>
  );
}
