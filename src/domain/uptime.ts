/**
 * Possible uptime statuses.
 */
export type UptimeStatus = 'up' | 'down' | 'degraded'

/**
 * Recorded uptime event.
 */
export type UptimeEvent = {
    /**
     * Event identifier.
     */
    id: string
    /**
     * Project the event belongs to.
     */
    projectId: string
    /**
     * Uptime status.
     */
    status: UptimeStatus
    /**
     * Optional message for the event.
     */
    message?: string
    /**
     * Response time in milliseconds.
     */
    responseTimeMs?: number
    /**
     * ISO timestamp of the check.
     */
    checkedAt?: string
    /**
     * ISO timestamp of backend creation.
     */
    createdAt?: string
}

/**
 * Payload for sending an uptime heartbeat.
 */
export type UptimeHeartbeatInput = {
    /**
     * Project DSN. Uses the SDK default when omitted.
     */
    dsnKey?: string
    /**
     * Reported status.
     */
    status: UptimeStatus
    /**
     * Response time in milliseconds.
     */
    responseTimeMs?: number
    /**
     * ISO timestamp of the check.
     */
    checkedAt?: string
    /**
     * Optional message.
     */
    message?: string
}

/**
 * Daily uptime summary.
 */
export type UptimeSummary = {
    /**
     * ISO date of the summary.
     */
    date: string
    /**
     * Hours without data.
     */
    missingHours?: number
    /**
     * Accumulated delay minutes.
     */
    delayMinutes?: number
    /**
     * Number of delayed events.
     */
    delayedCount?: number
}
