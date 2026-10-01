/**
 * Address of a file in public/ (e.g. '/images/gallery/latvia/foto.webp'), prefixed with the
 * site's base path from vite.config.ts, so the site also works when served under a sub-path
 * such as https://example.lv/kultura/. Full URLs (https://…) are returned unchanged.
 */
export function publicUrl(path: string): string {
  if (/^[a-z]+:/i.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
