declare const global: any

export function isExpo() {
  return !!global && (!!global.__exponent || !!global.__expo)
}
