// import NextAuth from "next-auth";
// import { getToken } from "next-auth/jwt";
// import authConfig from "./auth.config";
// import {
//   authRoutes,
//   publicRoutes,
//   apiAuthRoutePrefix,
//   ADMIN_ROUTE_ONLY,
//   ADMIN_ROUTE_PREFIX,
// } from "./routes";
// import { UserRole } from "@prisma/client";

// const { auth } = NextAuth({ ...authConfig });

// export default auth(async (req) => {
//   const { nextUrl } = req;
//   const session = !!req.auth;

//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isApiRoute = nextUrl.pathname.startsWith(apiAuthRoutePrefix);
//   console.log("pathname ", nextUrl.pathname);
//   console.log("session ", req.auth);
//   if (session && isAuthRoute) {
//     return Response.redirect(new URL("/", nextUrl));
//   }

//   if (!session && !isPublicRoute && !isApiRoute && !isAuthRoute) {
//     const callbackUrl = nextUrl.pathname;

//     const encodeCallbackUrl = encodeURIComponent(callbackUrl);
//     return Response.redirect(
//       new URL(`/signin?redirect=${encodeCallbackUrl}`, nextUrl)
//     );
//   }

//   // if (nextUrl.pathname === EMAIL_VERIFY) {
//   //   const url = new URL(req.url);
//   //   const token = url.searchParams.get("token") || "";

//   //   if (!token) {
//   //     return Response.redirect(new URL(`/`, nextUrl));
//   //   }
//   // }

//   const user = await getToken({ req, secret: process.env.AUTH_SECRET });
//   const userRole = user?.role as UserRole;
//   if (
//     userRole &&
//     nextUrl.pathname.startsWith(ADMIN_ROUTE_PREFIX) &&
//     userRole === "USER"
//   ) {
//     return Response.redirect(new URL(`/`, nextUrl));
//   }

//   if (
//     userRole &&
//     ADMIN_ROUTE_ONLY.includes(nextUrl.pathname) &&
//     userRole !== "ADMIN"
//   ) {
//     return Response.redirect(new URL(`/`, nextUrl));
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };


import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import authConfig from "./auth.config";
import {
  authRoutes,
  publicRoutes,
  apiAuthRoutePrefix,
  ADMIN_ROUTE_ONLY,
  ADMIN_ROUTE_PREFIX,
} from "./routes";
import { UserRole } from "@prisma/client";

const { auth } = NextAuth({ ...authConfig });

export default auth(async (req) => {
  const { nextUrl } = req;
  const session = !!req.auth;
  const locale = nextUrl.pathname.split("/")[1]; // Extract locale (e.g., 'en' or 'bn')

  const supportedLocales = ["en", "bn"];
  const isValidLocale = supportedLocales.includes(locale);

  if (!isValidLocale) {
    // Default to 'en' if no valid locale is present
    return Response.redirect(new URL(`/en${nextUrl.pathname}`, nextUrl));
  }

  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.startsWith(apiAuthRoutePrefix);

  console.log("pathname ", nextUrl.pathname);
  console.log("session ", req.auth);

  if (session && isAuthRoute) {
    return Response.redirect(new URL(`/${locale}/`, nextUrl));
  }

  if (!session && !isPublicRoute && !isApiRoute && !isAuthRoute) {
    const callbackUrl = nextUrl.pathname;
    const encodeCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/${locale}/signin?redirect=${encodeCallbackUrl}`, nextUrl)
    );
  }

  const user = await getToken({ req, secret: process.env.AUTH_SECRET });
  const userRole = user?.role as UserRole;

  if (
    userRole &&
    nextUrl.pathname.startsWith(`/${locale}${ADMIN_ROUTE_PREFIX}`) &&
    userRole === "USER"
  ) {
    return Response.redirect(new URL(`/${locale}/`, nextUrl));
  }

  if (
    userRole &&
    ADMIN_ROUTE_ONLY.includes(nextUrl.pathname) &&
    userRole !== "ADMIN"
  ) {
    return Response.redirect(new URL(`/${locale}/`, nextUrl));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
