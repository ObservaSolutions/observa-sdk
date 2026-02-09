import type { IngestRequest, IngestResponse } from '../domain/ingest'
import { ensureDefined, ensureNonEmpty } from '../utils/validate'
import type { HttpClient } from '../http/httpClient'

/**
 * Event ingestion API.
 */
export class IngestApi {
    /**
     * Creates the ingestion client with an optional default DSN.
     */
    constructor(private readonly http: HttpClient, private readonly defaultDsnKey?: string) { }

    /**
     * Sends an event to the ingestion backend.
     */
    async event(input: IngestRequest): Promise<IngestResponse> {
        ensureDefined(input, 'input')
        const dsnKey = input.dsnKey ?? this.defaultDsnKey
        ensureDefined(dsnKey, 'dsnKey')
        ensureNonEmpty(dsnKey, 'dsnKey')
        ensureDefined(input.event, 'event')
        return this.http.post<IngestResponse>('/ingest/events', { ...input, dsnKey }, { auth: 'apiKey' })
    }
}
