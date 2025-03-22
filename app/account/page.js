"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../_lib/supabase";

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data?.user) {
        router.push("/login"); // ✅ Redirect to login if not logged in
      } else {
        setUser(data.user);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return user ? (
    <div className="space-y-4">
      <h1>Welcome, Hilal</h1>
      <h2>✅ Logged in as: {user.email}</h2>
      <button
        className="mt-4 rounded bg-red-600 p-2 text-white"
        onClick={async () => {
          await supabase.auth.signOut();
          router.push("/login"); // ✅ Redirect after logout
        }}
      >
        Logout
      </button>
    </div>
  ) : null;
}
