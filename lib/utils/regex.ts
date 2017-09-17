export function firstUpperCase(str: string) {
    return str.replace(/^\S/, function (s: string) {
        return s.toLowerCase();
    });
}

