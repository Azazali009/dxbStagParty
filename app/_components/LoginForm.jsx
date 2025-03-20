"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../_lib/supabase";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("aizaz.0938@gmail.com"); // Hardcoded for testing
  const [password, setPassword] = useState("azazkhan");
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
    <div className="mx-auto max-w-md rounded-md p-6 text-black shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold">Login</h2>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          name="email"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full rounded border p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          name="password"
        />
        <button
          type="submit"
          className="w-full rounded bg-blue-600 p-2 text-white"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
