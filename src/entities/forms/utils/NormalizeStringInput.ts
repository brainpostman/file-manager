export function normalizeStringInput(str: string) {
    return str.trim().replace(/\s\s+/g, ' ');
}
