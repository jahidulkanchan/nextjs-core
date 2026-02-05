'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Authentication() {
  const {data} = useSession()
  return (
    <>
      {data ? (
        <button onClick={() => signOut()} className="rounded-full cursor-pointer bg-black px-6 py-2 text-white transition hover:bg-gray-900">
          Logout
        </button>
      ) : (
        <button onClick={() => signIn()} className="rounded-full cursor-pointer border border-white bg-black px-6 py-2 text-white transition hover:bg-black">
          Log in
        </button>
      )}
    </>
  );
}