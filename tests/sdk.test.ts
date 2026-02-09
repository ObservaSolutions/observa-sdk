import { jest } from '@jest/globals'
import { ObservaSDK } from '../src/sdk'

describe('ObservaSDK', () => {
    const originalFetch = global.fetch as any

    afterEach(() => {
        global.fetch = originalFetch
        jest.resetAllMocks()
    })

    test('ingest.event usa apiKey y retorna event_id', async () => {
        const fetchMock = (jest.fn() as any)
            .mockImplementationOnce(async () => ({
                ok: true,
                status: 200,
                text: async () => JSON.stringify({ status: 'ok', duration_ms: 0 }),
            }))
            .mockImplementationOnce(async () => ({
                ok: true,
                status: 200,
                text: async () => JSON.stringify({ event_id: 'evt_1' }),
            }))
        global.fetch = fetchMock as any
        const sdk = new ObservaSDK({ apiKey: 'dsnKey', dsnKey: 'dsn_123' })
        const result = await sdk.ingest.event({
            event: { level: 'error', message: 'boom' },
        })
        expect(result.event_id).toBe('evt_1')
        const [, options] = (global.fetch as any).mock.calls[1]
        expect(options.headers['x-api-key']).toBe('dsnKey')
    })
})
