import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/store/server/account/actions";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const responseSession = await updateSession(request);
  const nextResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const _session = responseSession?.cookies.get("session");
  if (_session) {
    nextResponse.cookies.set(_session);
  }

  return nextResponse;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/:path*",
};
