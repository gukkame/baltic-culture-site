export function publicUrl(path: string): string {
  if (/^[a-z]+:/i.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
