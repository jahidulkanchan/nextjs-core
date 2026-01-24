import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50 text-stone-900">
      {/* Navigation */}
      <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter">BRAND.</div>
          <ul className="flex gap-8 text-sm font-medium">
            <li className="hover:text-stone-500 transition-colors cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="hover:text-stone-500 transition-colors">
              <Link href="/products">Products</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-semibold leading-tight mb-6">
            Design is the <span className="italic font-serif">silent</span>{" "}
            ambassador of your brand.
          </h1>
          <p className="text-lg md:text-xl text-stone-600 mb-10 leading-relaxed">
            Discover our curated collection of minimalist essentials designed
            for the modern home. Quality materials meets timeless aesthetics.
          </p>

          <div className="flex gap-4 text-center justify-center items-center">
            <Link
              href="/products"
              className="px-8 py-3 bg-stone-900 text-stone-50 rounded-full hover:bg-stone-800 transition-all shadow-lg hover:shadow-stone-200"
            >
              Shop Collection
            </Link>
            <button className="px-8 py-3 border border-stone-300 rounded-full hover:bg-stone-100 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
