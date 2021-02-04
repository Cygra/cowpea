export const suffixSlash = (url: string): string => {
  if (url === '' || url.endsWith('/')) return url
  return `${url}/`
}
