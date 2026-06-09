import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Public client (for reads) — returns null if not configured
function createPublicClient(): SupabaseClient | null {
  if (!isValidUrl(supabaseUrl) || !supabaseAnonKey) {
    return null
  }
  return createClient(supabaseUrl, supabaseAnonKey)
}

// Server-side client with service role key (for mutations)
export function getServiceSupabase(): SupabaseClient | null {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  if (!isValidUrl(supabaseUrl) || !serviceRoleKey) {
    return null
  }
  return createClient(supabaseUrl, serviceRoleKey)
}

export const supabase = createPublicClient()
