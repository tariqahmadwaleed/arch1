export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // If it's already a full URL, return as-is
  if (src.startsWith("http")) {
    return src
  }

  // If it's a placeholder, return as-is
  if (src.includes("placeholder.svg")) {
    return src
  }

  // For Supabase storage URLs
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (!supabaseUrl) {
    return src
  }

  // Construct optimized image URL
  const params = new URLSearchParams()
  params.set("width", width.toString())
  if (quality) {
    params.set("quality", quality.toString())
  }

  return `${supabaseUrl}/storage/v1/render/image/public/${src}?${params.toString()}`
}
