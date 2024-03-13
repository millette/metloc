// node
import fs from "node:fs"

// npm
import JPEGDecoder from "jpg-stream/decoder.js"
import open from "open"

function conv(deg, min, sec, dir) {
  dir = dir.toLowerCase()
  const mul = (dir === 'n' || dir === 'e') ? 1 : -1
  return mul * (deg + min / 60 + sec / 3600)
}

function link(lat, lon) {
  const latDec = conv(...lat)
  const lonDec = conv(...lon)
  return `https://www.google.com/maps/place/${latDec},${lonDec}`
}

const fn = process.argv[2]

if (!fn) {
  console.error("Requis: chemin vers une image contenant des données gps.")
  process.exit(1)
}

fs.createReadStream(fn)
  .pipe(new JPEGDecoder)
  .on("meta", async ({ gps }) => {
    if (!gps) return console.error(`Aucune donnée GPS dans ${fn}.`)
    const { GPSLatitudeRef, GPSLatitude, GPSLongitudeRef, GPSLongitude } = gps
    GPSLatitude.push(GPSLatitudeRef)
    GPSLongitude.push(GPSLongitudeRef)
    await open(link(GPSLatitude, GPSLongitude))
  })
