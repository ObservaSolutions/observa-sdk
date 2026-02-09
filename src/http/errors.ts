/**
 * Additional data to enrich SDK errors.
 */
export type ErrorDetails = {
    status?: number
    code?: string
    details?: unknown
    retryAfter?: number
}

/**
 * Base SDK error.
 */
export class SdkError extends Error {
    readonly status?: number
    readonly code?: string
    readonly details?: unknown

    /**
     * Creates an error with optional metadata.
     */
    constructor(message: string, details?: ErrorDetails) {
        super(message)
        this.name = new.target.name
        this.status = details?.status
        this.code = details?.code
        this.details = details?.details
    }
}

/**
 * Input validation error.
 */
export class ValidationError extends SdkError { }
/**
 * Authentication error.
 */
export class AuthError extends SdkError { }
/**
 * Error caused by insufficient permissions.
 */
export class ForbiddenError extends SdkError { }
/**
 * Error when a resource does not exist.
 */
export class NotFoundError extends SdkError { }
/**
 * Error caused by a state conflict.
 */
export class ConflictError extends SdkError { }
/**
 * Error caused by rate limiting.
 */
export class RateLimitError extends SdkError {
    readonly retryAfter?: number

    constructor(message: string, details?: ErrorDetails) {
        super(message, details)
        this.retryAfter = details?.retryAfter
    }
}
/**
 * Server-side error.
 */
export class ServerError extends SdkError { }
/**
 * Network error.
 */
export class NetworkError extends SdkError { }
/**
 * Request timeout error.
 */
export class TimeoutError extends SdkError { }

/**
 * Maps HTTP status codes to typed SDK errors.
 */
export function mapHttpError(status: number, details?: unknown, retryAfter?: number): SdkError {
    const info = { status, details, retryAfter }
    if (status === 400) return new ValidationError('Invalid request', info)
    if (status === 401) return new AuthError('Unauthorized', info)
    if (status === 403) return new ForbiddenError('Forbidden', info)
    if (status === 404) return new NotFoundError('Resource not found', info)
    if (status === 409) return new ConflictError('Conflict', info)
    if (status === 429) return new RateLimitError('Rate limit exceeded', info)
    if (status >= 500) return new ServerError('Server error', info)
    return new SdkError('HTTP error', info)
}
