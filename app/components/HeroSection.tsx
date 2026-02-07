import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function HeroSection() {
    const session = await getServerSession(authOptions)
    console.log(session)
  return (
    <>
    <section className="container mx-auto px-6 py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-6 text-4xl leading-tight font-semibold sm:text-5xl md:text-7xl">
            Design is the <span className="font-serif italic">silent</span>{" "}
            ambassador of your brand.
          </h1>
          <p className="mb-10 text-base leading-relaxed text-stone-600 sm:text-lg md:text-xl">
            Discover our curated collection of minimalist essentials designed
            for the modern home. Quality materials meets timeless aesthetics.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
            <Link
              href="/products"
              className="min-w-[180px] rounded-full bg-stone-900 px-8 py-3 text-stone-50 shadow-lg transition-all hover:bg-stone-800 hover:shadow-stone-200"
            >
              Shop Collection
            </Link>
            <button className="min-w-[180px] rounded-full border border-stone-300 px-8 py-3 transition-all hover:bg-stone-100">
              Learn More
            </button>
          </div>
        </div>

        <pre>{JSON.stringify(session) || "No User Avabile" }</pre>
      </section>
    </>
  )
}
