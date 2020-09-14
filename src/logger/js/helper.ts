export function stringifyWithReplacer(data) {
    const str = JSON.stringify(data) || "";
    return str.replace(/\\/g, "");
}