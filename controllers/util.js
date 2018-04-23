'use strict'

module.exports = class UtilController {
  // /446H.jpg

  static async wallpaper(ctx) {
    const wallpaperAPI = `https://cdn.gratisography.com/photos/${parseInt(467 * Math.random())}H.jpg`

    ctx.body = ctx.util.resuccess({
      type: 'photos',
      url: wallpaperAPI
    })
  }
}
