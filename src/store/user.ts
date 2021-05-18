export enum StoreKey {
    USER = 'current_user',
    TOKEN = 'token',
}

export function getStoreData<T>(key: StoreKey): T | null {
    try {
        const data = localStorage.getItem(key)
        return data === null ? data : (JSON.parse(data) as T)
    } catch (_error) {
        return null
    }
}

export function setStoreData<T>(key: StoreKey, data: T): void {
    try {
        const dataString = JSON.stringify(data)
        localStorage.setItem(key, dataString)
    } catch (_error) {
        return
    }
}
