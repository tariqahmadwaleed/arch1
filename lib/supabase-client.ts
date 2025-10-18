import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr"

let browserClient: ReturnType<typeof createSupabaseBrowserClient> | null = null

export function createBrowserClient() {
  if (browserClient) {
    return browserClient
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Supabase environment variables are not set. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.",
    )
  }

  browserClient = createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey)

  return browserClient
}
