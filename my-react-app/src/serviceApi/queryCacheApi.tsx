interface CacheEntry<T> {
    data: T
    timestamp: number
    key: string
}

export class ApiCache {
    private cache = new Map<string, CacheEntry<unknown>>()
    private readonly TTL = 3 * 60 * 1000 // 3 минуты в миллисекундах

    private createKey(url: string, params?: Record<string, unknown>): string {
        return url + JSON.stringify(params || {})
    }

    private isValid(entry: CacheEntry<unknown>): boolean {
        return Date.now() - entry.timestamp < this.TTL
    }

    async get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
        const key = this.createKey(url, params)
        const cached = this.cache.get(key)

        if (cached && this.isValid(cached)) {
            return cached.data as T
        }

        try {
            const response = await fetch(url + '?' + new URLSearchParams(params as Record<string, string>))
            const data = await response.json()

            this.cache.set(key, {
                data,
                timestamp: Date.now(),
                key
            })

            return data
        } catch (error) {
            console.error('Error fetching data:', error)
            throw error
        }
    }

    cleanup() {
        for (const [key, entry] of this.cache.entries()) {
            if (!this.isValid(entry)) {
                this.cache.delete(key)
            }
        }
    }
}