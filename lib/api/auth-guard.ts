import { createServerClient } from "@/lib/supabase/server"
import { ApiError } from "./error-handler"

export async function requireAuth() {
  const supabase = await createServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new ApiError(401, "Unauthorized", "AUTH_REQUIRED")
  }

  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth()
  const supabase = await createServerClient()

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || !allowedRoles.includes(profile.role)) {
    throw new ApiError(403, "Forbidden", "INSUFFICIENT_PERMISSIONS")
  }

  return { user, profile }
}
