"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
// import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCredentialsLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-[95vh] px-5 flex items-center justify-center bg-white">
      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm">
        {/* Header */}
        <h1 className="text-2xl font-semibold text-black text-center">
          Sign in to your account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Welcome back 👋
        </p>

        {/* Credentials form */}
        <form onSubmit={handleCredentialsLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="admin"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white rounded-md py-2 text-sm font-medium hover:bg-gray-900 transition disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
         {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="text-sm text-gray-500 text-center mt-4">
          You have not an account?{" "}
          <a href="/register" className="text-black font-medium hover:underline">
            Register
          </a>
        </p>

         {/* Google login */}
        {/* <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="mt-6 w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 text-sm font-medium text-black hover:bg-gray-50 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button> */}
      </div>
    </div>
  );
}
