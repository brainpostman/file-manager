export function NormalizeStringInput(str: string) {
    return str.trim().replace(/\s\s+/g, ' ');
}
