import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  const isProtectedRoute =
    pathname.startsWith("/account") || pathname.startsWith("/dashboard");

  const isLoginPage = pathname.startsWith("/login");

  //ORGANISER RESTRICTION: Organiser should not access '/dashboard' and there nested router page
  if (
    user?.user_metadata?.role === "organiser" &&
    pathname.startsWith("/dashboard")
  ) {
    return new Response(null, { status: 404 });
  }

  //ADMIN RESTRICTION: Admin should not access /account page
  if (
    user?.user_metadata?.role === "admin" &&
    pathname.startsWith("/account")
  ) {
    return new Response(null, { status: 404 });
  }

  // SUPPLIER RESTRICTION: Supplier shoudl only access these routes
  if (user?.user_metadata?.role === "supplier") {
    const allowedPaths = [
      "/dashboard/activities",
      "/dashboard/me",
      "/verify-login",
      "/login",
    ];

    const isAllowed = allowedPaths.some((path) => pathname.startsWith(path));

    if (!isAllowed) {
      return new Response(null, { status: 404 });
    }
  }

  // 🔐 Block unauthenticated users from protected pages
  if (!user && isProtectedRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // 🚫 Prevent logged-in users from seeing login page
  if (user && isLoginPage) {
    const role = user?.user_metadata?.role;
    const url = request.nextUrl.clone();
    url.pathname =
      role === "supplier"
        ? "/dashboard/activities"
        : role === "admin"
          ? "/dashboard"
          : "/account";

    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
