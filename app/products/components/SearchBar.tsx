"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter(); 

  function handleSearch(queryValue: string) {
    const params = new URLSearchParams(searchParams.toString().toLowerCase());
    if (queryValue) {
      params.set("search", queryValue);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params}`, { scroll: false });
  }

  return (
    <>
      <div className="relative flex w-full max-w-md items-center">
        <div className="pointer-events-none absolute left-3 text-gray-400">
          <HiOutlineSearch size={20} />
        </div>

        <input
          type="text"
          placeholder="Search the Product"
          defaultValue={searchParams.get("search")?.toString()}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-md border border-gray-200 bg-white py-2 pr-4 pl-10 text-sm outline-none focus:border-slate-200 focus:ring-1 focus:ring-slate-400"
        />
      </div>
    </>
  );
}
