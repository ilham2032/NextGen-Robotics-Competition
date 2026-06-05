import { useCallback, useEffect, useState } from 'react'
import type { Team, MatchResult, CompetitionResult } from '../admin/types'
import {
  fetchRemoteCompetitionResults,
  fetchRemoteMatchResults,
  fetchRemoteTeams,
  getCompetitionResults,
  getMatchResults,
  getTeams,
  saveCompetitionResults,
  saveMatchResults,
  saveTeams,
} from '../admin/storage'

const mergeById = <T extends { id: string }>(local: T[], remote: T[] | null): T[] => {
  if (!remote || remote.length === 0) return local
  const map = new Map(local.map((item) => [item.id, item]))
  remote.forEach((item) => map.set(item.id, item))
  return Array.from(map.values())
}

const hydrateTeams = (remote: Team[] | null): Team[] => {
  const local = getTeams()
  const merged = mergeById(local, remote)
  if (remote && remote.length > 0) {
    saveTeams(merged)
  }
  return merged
}

const hydrateMatchResults = (remote: MatchResult[] | null): MatchResult[] => {
  const local = getMatchResults()
  if (remote && remote.length >= local.length) {
    saveMatchResults(remote)
    return remote
  }
  if (remote && remote.length > 0) {
    const merged = mergeById(local, remote)
    saveMatchResults(merged)
    return merged
  }
  return local
}

const hydrateCompetitionResults = (remote: CompetitionResult[] | null): CompetitionResult[] => {
  const local = getCompetitionResults()
  if (remote && remote.length >= local.length) {
    saveCompetitionResults(remote)
    return remote
  }
  if (remote && remote.length > 0) {
    const merged = mergeById(local, remote)
    saveCompetitionResults(merged)
    return merged
  }
  return local
}

type LiveCompetitionData = {
  teams: Team[]
  matchResults: MatchResult[]
  competitionResults: CompetitionResult[]
  isSyncing: boolean
  refresh: () => Promise<void>
}

export const useLiveCompetitionData = (pollIntervalMs = 20000): LiveCompetitionData => {
  const [teams, setTeams] = useState<Team[]>(() => getTeams())
  const [matchResults, setMatchResults] = useState<MatchResult[]>(() => getMatchResults())
  const [competitionResults, setCompetitionResults] = useState<CompetitionResult[]>(() => getCompetitionResults())
  const [isSyncing, setIsSyncing] = useState(false)

  const refresh = useCallback(async () => {
    setIsSyncing(true)
    try {
      const [remoteTeams, remoteMatches, remoteCompetition] = await Promise.all([
        fetchRemoteTeams(),
        fetchRemoteMatchResults(),
        fetchRemoteCompetitionResults(),
      ])
      setTeams(hydrateTeams(remoteTeams))
      setMatchResults(hydrateMatchResults(remoteMatches))
      setCompetitionResults(hydrateCompetitionResults(remoteCompetition))
    } finally {
      setIsSyncing(false)
    }
  }, [])

  useEffect(() => {
    void refresh()
    const interval = window.setInterval(() => {
      void refresh()
    }, pollIntervalMs)
    return () => window.clearInterval(interval)
  }, [pollIntervalMs, refresh])

  return { teams, matchResults, competitionResults, isSyncing, refresh }
}
