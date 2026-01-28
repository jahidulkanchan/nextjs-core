import Image from "next/image";
import Link from "next/link"; // 1. Import Link
import { IProduct } from "../api/products/models/Product";

export default async function Page() {
  const data = await fetch(`${process.env.BASE_URL}/products`, {
    cache: "force-cache",
  });
  const { products } = await data.json();

  return (
    <main className="bg-white text-stone-900 min-h-screen">
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <header className="mb-12">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Our Collection</h1>
            <p className="text-stone-500">Explore our curated selection of premium goods.</p>
          </header>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: IProduct, index: number) => (
                /* 2. Wrap the card in a Link pointing to /collections/[id] */
                <Link 
                  key={product._id.toString() || index} 
                  href={`/collections/${product._id}`}
                  className="group flex flex-col"
                >
                  <div className="aspect-[4/5] w-full bg-stone-100 rounded-lg overflow-hidden relative mb-4 transition-all duration-300 group-hover:shadow-md">
                    <div className="absolute inset-0">
                      <Image
                        alt={product.name}
                        fill // 3. Use 'fill' for better responsive handling
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        src="https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=684&auto=format&fit=crop"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-400">
                      Category
                    </h3>
                    <h2 className="text-lg font-medium group-hover:underline decoration-stone-300 underline-offset-4">
                      {product.name}
                    </h2>
                    <p className="text-stone-900 font-bold mt-1">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center py-40 text-center border-2 border-dashed border-stone-100 rounded-3xl">
              <h2 className="text-xl font-medium text-stone-400">No Products Found</h2>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}