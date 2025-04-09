"use server";

import { redirect } from "next/navigation";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";

// delete
export async function test(formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.log(error);
    throw new Error("Could not signIn");
  }

  revalidatePath("/account");
  redirect("/account");
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function addActivityAction(formData) {
  console.log(formData.get("name"));
}
