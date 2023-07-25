const endingDotRegex = /^.*\.$/;
const forbiddenSymbolsRegex = /[<>:"|?*\\/]+/;

export function validateNodeName(name: string) {
    if (name.length === 0) return false;
    if (endingDotRegex.test(name)) return false;
    if (forbiddenSymbolsRegex.test(name)) return false;
    return true;
}
