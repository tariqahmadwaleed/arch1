import { updateSession } from "@/lib/supabase/middleware"
import type { NextRequest } from "next/server"
import { logger } from "@/lib/monitoring/logger"

export async function middleware(request: NextRequest) {
  // Log request
  logger.debug("Request", {
    method: request.method,
    url: request.url,
    userAgent: request.headers.get("user-agent"),
  })

  // Add security headers
  const response = await updateSession(request)

  // Add CSP header
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://*.supabase.co;",
  )

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
