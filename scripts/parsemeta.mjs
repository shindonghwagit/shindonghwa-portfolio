import fs from 'fs'
const f = process.argv[2]
const arr = JSON.parse(fs.readFileSync(f, 'utf8'))
const xml = arr.map((e) => e.text).join('\n')
const lines = xml.split('\n')
// direct children of frame 7:17 ("1920w light") are indented with 4 spaces.
// Print top-level section frames: lines starting with exactly 4 spaces + <tag
for (const ln of lines) {
  const m = ln.match(/^ {4}<(\w+) id="([^"]+)" name="([^"]+)"[^>]*width="([\d.]+)" height="([\d.]+)"/)
  if (m) {
    console.log(`${m[2].padEnd(9)} ${m[1].padEnd(9)} h=${Math.round(+m[5]).toString().padStart(5)}  ${m[3]}`)
  }
}
