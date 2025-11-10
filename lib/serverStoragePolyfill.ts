// lib/serverStoragePolyfill.ts

// Polyfill `localStorage` in the Node.js environment used by Next.js during SSR or
// build steps. Some third-party SDKs expect a Storage-like object to exist even
// when rendering on the server. Next 16 ships with an experimental storage
// implementation, but when it is unavailable (or lacks the full API) we provide
// a lightweight in-memory fallback that satisfies the interface used at runtime.

const globalWithStorage = globalThis as typeof globalThis & { localStorage?: Storage };

if (typeof window === "undefined") {
  const needsPolyfill =
    !globalWithStorage.localStorage ||
    typeof globalWithStorage.localStorage.getItem !== "function" ||
    typeof globalWithStorage.localStorage.setItem !== "function";

  if (needsPolyfill) {
    const store = new Map<string, string>();

    const storage = {
      clear() {
        store.clear();
      },
      getItem(key: string) {
        return store.has(key) ? store.get(key)! : null;
      },
      key(index: number) {
        return Array.from(store.keys())[index] ?? null;
      },
      removeItem(key: string) {
        store.delete(key);
      },
      setItem(key: string, value: string) {
        store.set(key, String(value));
      },
    } as Storage;

    Object.defineProperty(storage, "length", {
      get: () => store.size,
    });

    globalWithStorage.localStorage = storage;
  }
}

export {};
