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
    pathname.startsWith("/account") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("become_a_supplier/apply");

  const isLoginPage = pathname.startsWith("/login");
  const isBecomeSupplier = pathname.startsWith("/become_a_supplier");

  //ORGANISER RESTRICTION: Organiser should not access '/dashboard' and there nested router page
  if (
    user?.user_metadata?.role === "organiser" &&
    pathname.startsWith("/dashboard")
  ) {
    return new Response(null, { status: 404 });
  }

  // SUPPLIER RESTRICTION: Supplier should only access these routes
  if (user?.user_metadata?.role === "supplier") {
    // Check only for dashboard access
    const isDashboardPath = pathname.startsWith("/dashboard");

    if (isDashboardPath) {
      // const allowedDashboardPath = "/dashboard/activities";
      const allowedDashboardPaths = ["/dashboard/activities", "/dashboard/me"];
      // const isAllowed = pathname.startsWith(allowedDashboardPath);
      // check agar supplier ka current path allowed list me hai
      const isAllowed = allowedDashboardPaths.some((path) =>
        pathname.startsWith(path),
      );

      if (!isAllowed) {
        return new Response(null, { status: 404 });
      }
    }

    // For non-dashboard paths, allow access
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

  // 🚫 Prevent logged-in users from accessing /become_a_supplier/apply
  if (user && isBecomeSupplier) {
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
