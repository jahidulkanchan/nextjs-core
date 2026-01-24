"use client";

import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter(); // URL পরিবর্তন করার জন্য

  function handleSearch(queryValue: string){
    console.log(queryValue)
    const params = new URLSearchParams(searchParams.toString().toLowerCase())
    if(queryValue){
      params.set('search', queryValue)
    }else{
      params.delete('search')
    }
    replace(`${pathname}?${params}` , {scroll:false})
  }

  return (
    <>
      <nav className="border-b border-stone-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
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
      <br />
      <div className="relative flex items-center w-full max-w-md">
        <div className="absolute left-3 text-gray-400 pointer-events-none">
          <HiOutlineSearch size={20} />
        </div>

        <input
          type="text"
          placeholder="Search the Product"
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-md py-2 pl-10 pr-4 text-sm 
                   outline-none focus:border-black focus:ring-1 focus:ring-black"
        />
      </div>
    </>
  );
}
