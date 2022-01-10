export function saveItem(key: string, value: string) {
    localStorage.setItem(key, value);

}

export function getItem(key: string) {
    return localStorage.getItem(key);
}

export function removeItem(key: string) {
    return localStorage.removeItem(key);

}

export function clearStorage() {
    return localStorage.clear();
}