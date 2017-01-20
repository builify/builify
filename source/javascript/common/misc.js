export function emptyFunction () {}

export function getExtension (filename) {
  if (!filename) {
    return '';
  }
  
  return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
}
