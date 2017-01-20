export function emptyFunction () {}

export function getExtension (filename) {
  if (!filename) {
    return undefined;
  }
  
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}
