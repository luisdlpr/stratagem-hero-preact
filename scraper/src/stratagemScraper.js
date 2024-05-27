const { chromium } = require('playwright')

;(async () => {
  const browser = await chromium.launch({
    headless: false,
    viewport: { width: 1920, height: 1080 },
  })

  const HREF_TO_WASD = {
    '/wiki/File:Down_Arrow.png': 's',
    '/wiki/File:Left_Arrow.png': 'a',
    '/wiki/File:Right_Arrow.png': 'd',
    '/wiki/File:Up_Arrow.png': 'w',
  }

  const context = await browser.newContext()

  // Open new page
  const page = await context.newPage()
  await page.setViewportSize({ width: 1920, height: 1080 })

  // Open urls
  const fs = require('fs')
  const url = 'https://helldivers.wiki.gg/wiki/Stratagems'
  const scraperOutput = []

  // goto url
  await page.goto(url)

  // Scrape data
  const rows = page.locator('tbody > tr')

  for (let i = 1; i < (await rows.count()); i++) {
    const row = rows.nth(i).locator('td')

    const name = await row.nth(1).locator('a').innerText()

    const code = await row
      .nth(2)
      .locator('a')
      .evaluateAll(
        (elements, mapping) =>
          elements
            .map((element) => mapping[element.getAttribute('href')])
            .join(''),
        HREF_TO_WASD
      )

    let thumbnail = ''
    try {
      thumbnail = await row.nth(0).locator('a > img').getAttribute('src')
    } catch (e) {}

    console.log(thumbnail, name, code)
    scraperOutput.push({ thumbnail, name, code })
  }

  // let description = await page.locator('div.text-more').allInnerTexts();
  // let cover_images = page.locator('img.carousel-cell-image', { timeout: 9999 });

  // save data in JSON
  const json = JSON.stringify(scraperOutput)

  // save JSON to disk
  fs.writeFile('output.json', json, 'utf8', (err) => {
    if (err) {
      console.log(err)
    }
  })

  // ---------------------
  await context.close()
  await browser.close()
})()
