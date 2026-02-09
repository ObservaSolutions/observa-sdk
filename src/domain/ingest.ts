/**
 * Severity levels for events.
 */
export type IngestLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal'

/**
 * Ingestion event.
 */
export type IngestEvent = {
    /**
     * Unique event identifier.
     */
    event_id?: string
    /**
     * Event ISO timestamp.
     */
    timestamp?: string
    /**
     * Severity level.
     */
    level?: IngestLevel
    /**
     * Main message.
     */
    message?: string
    /**
     * Free-form context payload.
     */
    payload?: unknown
}

/**
 * Payload for sending an event to the backend.
 */
export type IngestRequest = {
    /**
     * Project DSN. Uses the SDK default when omitted.
     */
    dsnKey?: string
    /**
     * Event to record.
     */
    event: IngestEvent
}

/**
 * Response after sending an event.
 */
export type IngestResponse = {
    /**
     * Assigned event identifier.
     */
    event_id: string
}
