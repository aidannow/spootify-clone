/**
 * This code is in collaboration with ChatGPT
 */

import ColorThief from "colorthief"

export function getDominantColorFromUrl(
  imageUrl: string
): Promise<[number, number, number]> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    // REQUIRED for Cloudinary / external images
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    const colorThief = new ColorThief()

    img.onload = () => {
      try {
        const color = colorThief.getColor(img)
        resolve(color)
      } catch (err) {
        reject(err)
      }
    }

    img.onerror = () => reject(new Error("Failed to load image"))
  })
}
