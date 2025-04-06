"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../_lib/supabase";
import Button from "./Button";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Hardcoded for testing
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      router.push("/account");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto max-w-md rounded-md border border-gray-300 bg-white p-6">
        <h2 className="mb-4 text-center text-2xl font-semibold">Login</h2>
        {error && <p className="mb-3 text-red-500">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="h-10 w-full rounded border border-gray-300 bg-gray-100 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
          />
          <input
            type="password"
            placeholder="Password"
            className="h-10 w-full rounded border border-gray-300 bg-gray-100 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            name="password"
          />
          <div className="w-full">
            <Button
              type="submit"
              disabled={loading}
              className="w-full py-2 text-base font-medium"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
