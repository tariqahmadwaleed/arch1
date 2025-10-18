"use server"

import { createClient } from "@/lib/supabase/server"

export async function getHistoricalEras() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("historical_eras").select("*").order("period")
  return { data: data || [], error: error?.message }
}

export async function getArchitecturalStyles() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("architectural_styles").select("*").order("name")
  return { data: data || [], error: error?.message }
}

export async function getPlants(type?: string) {
  const supabase = await createClient()
  let query = supabase.from("plants").select("*").order("name")
  if (type) query = query.eq("type", type)
  const { data, error } = await query
  return { data: data || [], error: error?.message }
}

export async function getSoilTypes() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("soil_types").select("*").order("name")
  return { data: data || [], error: error?.message }
}

export async function getStructuralSystems() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("structural_systems").select("*").order("category")
  return { data: data || [], error: error?.message }
}
