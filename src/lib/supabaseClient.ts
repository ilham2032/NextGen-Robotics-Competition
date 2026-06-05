import { createClient, SupabaseClient } from '@supabase/supabase-js'
import type { Team, MatchResult, CompetitionResult } from '../admin/types'

const SUPABASE_URL = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_SUPABASE_URL as string) || '' : ''
const SUPABASE_ANON_KEY = typeof import.meta !== 'undefined' ? (import.meta.env?.VITE_SUPABASE_ANON_KEY as string) || '' : ''

let supabase: SupabaseClient | null = null

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

export const isSupabaseConfigured = (): boolean => Boolean(supabase)

// Table `teams`: columns id (text PK), payload (jsonb)
export const getTeamsFromSupabase = async (): Promise<Team[] | null> => {
  if (!supabase) return null
  try {
    const { data, error } = await supabase.from('teams').select('payload')
    if (error) return null
    if (!Array.isArray(data)) return null
    return data.map((row: { payload: Team }) => row.payload).filter(Boolean)
  } catch {
    return null
  }
}

export const pushTeamsToSupabase = async (teams: Team[]): Promise<boolean> => {
  if (!supabase) return false
  try {
    const payload = teams.map((team) => ({ id: team.id, payload: team }))
    const { error } = await supabase.from('teams').upsert(payload, { onConflict: 'id' })
    return !error
  } catch {
    return false
  }
}

// Table `app_state`: columns key (text PK), payload (jsonb)
const getAppState = async <T,>(key: string): Promise<T | null> => {
  if (!supabase) return null
  try {
    const { data, error } = await supabase.from('app_state').select('payload').eq('key', key).maybeSingle()
    if (error || !data) return null
    return data.payload as T
  } catch {
    return null
  }
}

const setAppState = async (key: string, payload: unknown): Promise<boolean> => {
  if (!supabase) return false
  try {
    const { error } = await supabase.from('app_state').upsert({ key, payload }, { onConflict: 'key' })
    return !error
  } catch {
    return false
  }
}

export const getMatchResultsFromSupabase = async (): Promise<MatchResult[] | null> =>
  getAppState<MatchResult[]>('match_results')

export const pushMatchResultsToSupabase = async (results: MatchResult[]): Promise<boolean> =>
  setAppState('match_results', results)

export const getCompetitionResultsFromSupabase = async (): Promise<CompetitionResult[] | null> =>
  getAppState<CompetitionResult[]>('competition_results')

export const pushCompetitionResultsToSupabase = async (results: CompetitionResult[]): Promise<boolean> =>
  setAppState('competition_results', results)

export { supabase }
