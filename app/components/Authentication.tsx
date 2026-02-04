'use client'

export default function Authentication() {
  const user = false;

  return (
    <>
      {user ? (
        <button className="rounded-full cursor-pointer bg-black px-6 py-2 text-white transition hover:bg-gray-900">
          Logout
        </button>
      ) : (
        <button className="rounded-full cursor-pointer border border-white bg-black px-6 py-2 text-white transition hover:bg-black">
          Log in
        </button>
      )}
    </>
  );
}