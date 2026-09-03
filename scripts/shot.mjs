// Dev-only screenshot helper for verifying the landing page.
// Usage: node scripts/shot.mjs <outPath> [width] [selector]
import { chromium } from 'playwright'

const [, , outPath = 'shot.png', width = '1280', selector = ''] = process.argv
const URL = process.env.SHOT_URL || 'http://localhost:5178/landing'

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: Number(width), height: 900 },
  deviceScaleFactor: Number(process.env.SHOT_DPR || 2),
})
// Spline keeps a live connection, so `networkidle` never settles — use
// domcontentloaded + a fixed settle wait instead.
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 })
await page.waitForTimeout(Number(process.env.SHOT_WAIT || 1800))

if (selector) {
  const el = await page.$(selector)
  if (el) {
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(600)
    await el.screenshot({ path: outPath })
  } else {
    console.error('selector not found:', selector)
    await page.screenshot({ path: outPath })
  }
} else {
  await page.screenshot({ path: outPath, fullPage: true })
}

await browser.close()
console.log('saved', outPath)
