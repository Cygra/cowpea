export const suffixSlash = (url: string): string => {
  if (url.endsWith('/')) return url
  return `${url}/`
}
