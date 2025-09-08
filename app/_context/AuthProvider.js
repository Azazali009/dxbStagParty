"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../_utils/supabase/client";
import { useSupabaseSubscription } from "../_hooks/useSupabaseSubscription";
import { supabase } from "../_lib/supabase";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  useSupabaseSubscription({ table: "users", filterKey: "users" });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nonVerifyUsersCount, setNonVerifyUsersCount] = useState(0);

  async function getUser() {
    const supabase = createClient();
    // const { data } = await supabase.auth.getSession();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user || null);
    setLoading(false);
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    async function fetchUsers() {
      const supabase = createClient();
      const { count } = await supabase
        .from("users")
        .select("*", { count: "exact" })
        .eq("isVerified", false);

      setNonVerifyUsersCount(count);
    }
    fetchUsers();
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        refreshUser: getUser,
        nonVerifyUsersCount,
        setNonVerifyUsersCount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
