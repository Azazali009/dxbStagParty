"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "../_utils/supabase/client";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser: getUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
