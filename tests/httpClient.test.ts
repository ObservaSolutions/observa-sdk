import { jest } from '@jest/globals'
import { HttpClient } from '../src/http/httpClient'
import { AuthError } from '../src/http/errors'

describe('HttpClient', () => {
    const originalFetch = global.fetch as any

    afterEach(() => {
        global.fetch = originalFetch
        jest.resetAllMocks()
    })

    test('adjunta x-api-key cuando auth es apiKey', async () => {
        const fetchMock = (jest.fn() as any).mockImplementation(async () => ({
            ok: true,
            status: 200,
            text: async () => JSON.stringify({ ok: true }),
        }))
        global.fetch = fetchMock as any
        const client = new HttpClient({ baseUrl: 'http://localhost', apiKey: 'key123' })
        await client.get('/ping', { auth: 'apiKey' })
        const [, options] = (global.fetch as any).mock.calls[0]
        expect(options.headers['x-api-key']).toBe('key123')
    })

    test('mapea 401 a AuthError', async () => {
        const fetchMock = (jest.fn() as any).mockImplementation(async () => ({
            ok: false,
            status: 401,
            text: async () => JSON.stringify({ message: 'unauthorized' }),
        }))
        global.fetch = fetchMock as any
        const client = new HttpClient({ baseUrl: 'http://localhost', apiKey: 'key123' })
        await expect(client.get('/private', { auth: 'apiKey' })).rejects.toBeInstanceOf(AuthError)
    })
})
