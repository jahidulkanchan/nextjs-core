import Image from "next/image";
import Link from "next/link";
import { IProduct } from "../api/products/models/Product";
import { getAllProducts } from "../actions/products/getAllProducts";
import HandleDelete from "./components/HandleDelete";
import HandleUpdate from "./components/HandleUpdate";
import SearchBar from "./components/SearchBar";

export const revalidate = 0;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search = ""} = await searchParams;
  const products = await getAllProducts(search);
  return (
    <main className="min-h-screen bg-white text-stone-900">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <header className="mb-12 flex flex-col gap-8 sm:flex-row justify-between items-center">
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight">
                Our Collection
              </h1>
              <p className="text-stone-500">
                Explore our curated selection of premium goods.
              </p>
            </div>
            <SearchBar />
          </header>

          {products?.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products?.map((product: IProduct, index: number) => (
                <div
                  key={product._id.toString() || index}
                  className="group flex flex-col"
                >
                  <div className="relative mb-4 aspect-[4/5] w-full overflow-hidden rounded-lg bg-stone-100 transition-all duration-300 group-hover:shadow-md">
                    <div className="absolute inset-0">
                      <Image
                        loading="eager"
                        sizes="(max-width: 768px)"
                        alt={product.name}
                        fill // 3. Use 'fill' for better responsive handling
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=684&auto=format&fit=crop"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm text-black/80 uppercase text-shadow-2xs">
                      Category
                    </h3>
                    <Link
                      href={`/products/${product._id}`}
                      className="group flex flex-col"
                    >
                      <h2 className="text-lg font-medium decoration-stone-300 underline-offset-4 group-hover:underline">
                        {product.name}
                      </h2>
                    </Link>
                    <div className="flex items-center justify-between">
                      <p className="mt-1 font-bold text-stone-900">
                        ${product.price.toLocaleString()}
                      </p>
                      <div className="flex gap-4">
                        <HandleUpdate id={product._id.toString()} />

                        <HandleDelete id={product._id.toString()} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-stone-100 py-40 text-center">
              <h2 className="text-xl font-medium text-stone-400">
                No Products Found
              </h2>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
