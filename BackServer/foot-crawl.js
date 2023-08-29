const puppeteer = require("puppeteer");

async function getFootballData(Object){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.matchendirect.fr/france/ligue-1/", {
    waitUntil: 'load',
    timeout: 0
    }
  );

  Object.lieux = await page.evaluate(
    () => [...document.querySelectorAll('.lm3')].map(elem => elem.innerText)
  );
  Object.horaires = await page.evaluate(
    () => [...document.querySelectorAll('.lm2_time')].map(elem => elem.innerText)
  );

  browser.close();
  return Object;
}

module.exports = { getFootballData }
