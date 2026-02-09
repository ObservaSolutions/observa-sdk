import type { UptimeEvent, UptimeHeartbeatInput, UptimeSummary } from '../domain/uptime'
import { ensureDefined, ensureNonEmpty } from '../utils/validate'
import type { HttpClient } from '../http/httpClient'

/**
 * Uptime API for heartbeats and public reads.
 */
export class UptimeApi {
    /**
     * Creates the uptime client with an optional default DSN.
     */
    constructor(private readonly http: HttpClient, private readonly defaultDsnKey?: string) { }

    /**
     * Records an uptime heartbeat.
     */
    async recordHeartbeat(input: UptimeHeartbeatInput): Promise<UptimeEvent> {
        ensureDefined(input, 'input')
        const dsnKey = input.dsnKey ?? this.defaultDsnKey
        ensureDefined(dsnKey, 'dsnKey')
        ensureNonEmpty(dsnKey, 'dsnKey')
        ensureNonEmpty(input.status, 'status')
        return this.http.post<UptimeEvent>('/uptime/heartbeats', { ...input, dsnKey }, { auth: 'apiKey' })
    }

    /**
     * Lists a project's daily uptime history.
     */
    async history(projectId: string, date: string): Promise<UptimeEvent[]> {
        ensureNonEmpty(projectId, 'projectId')
        ensureNonEmpty(date, 'date')
        return this.http.get<UptimeEvent[]>(`/projects/${encodeURIComponent(projectId)}/uptime/history`, {
            query: { date },
            auth: 'none',
        })
    }

    /**
     * Gets the latest uptime event for a project.
     */
    async latest(projectId: string): Promise<UptimeEvent | null> {
        ensureNonEmpty(projectId, 'projectId')
        return this.http.get<UptimeEvent | null>(`/projects/${encodeURIComponent(projectId)}/uptime/latest`, {
            auth: 'none',
        })
    }

    /**
     * Summarizes daily uptime.
     */
    async summary(projectId: string, days?: number, delayThresholdMinutes?: number): Promise<UptimeSummary[]> {
        ensureNonEmpty(projectId, 'projectId')
        return this.http.get<UptimeSummary[]>(`/projects/${encodeURIComponent(projectId)}/uptime/summary`, {
            query: { days, delayThresholdMinutes },
            auth: 'none',
        })
    }
}
