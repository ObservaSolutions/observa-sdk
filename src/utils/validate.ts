import { ValidationError } from '../http/errors'

/**
 * Ensures a string is present and non-empty.
 */
export function ensureNonEmpty(value: string, name: string) {
    if (!value || value.trim().length === 0) {
        throw new ValidationError(`${name} is required`)
    }
}

/**
 * Ensures a value is neither null nor undefined.
 */
export function ensureDefined<T>(value: T | null | undefined, name: string): asserts value is T {
    if (value === null || value === undefined) {
        throw new ValidationError(`${name} is required`)
    }
}
