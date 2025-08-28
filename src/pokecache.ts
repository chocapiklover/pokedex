export type CacheEntry<T> = {
    createdAt: number
    val: T
}

export class Cache {
  #cache = new Map<string, CacheEntry<any>>();
  #reapIntervalId: NodeJS.Timeout | undefined = undefined;
  #interval: number;

  constructor(interval: number) {
    this.#interval = interval
    this.#startReapLoop()
  }
  
  add<T>(key: string, val: T): void {
    const newEntry: CacheEntry<T> = {
      createdAt: Date.now(),
      val: val
    }
    this.#cache.set(key, newEntry)
  }

  get<T>(key: string) : T | undefined {
    const entry = this.#cache.get(key)
    if (!entry) {
      return undefined
    }
    return entry.val
  }
  
  #reap():void {
    for (const [key, cacheEntry] of this.#cache)
      if (cacheEntry.createdAt < Date.now() - this.#interval) {
        this.#cache.delete(key)
      }
  }

  #startReapLoop(): void {
    this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    
  }

  stopReapLoop(): void {
    if (this.#reapIntervalId != undefined) {
      clearInterval(this.#reapIntervalId)
      this.#reapIntervalId = undefined
    }
  }

}


