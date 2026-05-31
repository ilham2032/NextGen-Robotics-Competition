/**
 * Resolve a path under the Vite `public/` folder for GitHub Pages subpath deploys.
 * Example: publicAsset('regs/mini-sumo.pdf') → /NextGen-Robotics-Competition/regs/mini-sumo.pdf
 */
export const publicAsset = (path: string): string => {
  const normalized = path.replace(/^\//, '')
  return `${import.meta.env.BASE_URL}${normalized}`
}

/** Resolve category PDF URLs, data URLs, or external links for use in href/src. */
export const resolvePublicUrl = (url: string): string => {
  if (!url) return url
  if (url.startsWith('data:') || url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return publicAsset(url)
}
