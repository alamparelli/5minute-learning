/** Join Astro's configured base path with an app-relative path, no double slashes. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return base + '/' + path.replace(/^\//, '');
}
