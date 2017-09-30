export function emptyFunction() {}

export function getExtension(filename) {
    if (!filename) {
        return undefined;
    }

    return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}

export function generatePageID() {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const uniqueKey = Math.random().toString(36).slice(-8);

    return `builifypage-${currentTimestamp}-${uniqueKey}`;
}
