const puppeteer = require("puppeteer");

async function getLotoData(Object){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.fdj.fr/jeux-de-tirage/loto/resultats", {
      waitUntil: 'load', 
      timeout: 0
    }
  );

  Object.Date = await page.evaluate(
    () => [...document.querySelectorAll('.Title')].map(elem => elem.innerText)
  );
  Object.Resultat1 = await page.evaluate(
    () => [...document.querySelectorAll('.game-ball')].map(elem => elem.innerText)
  );
  Object.Resultat2 = await page.evaluate(
    () => [...document.querySelectorAll('.is-seconddraw')].map(elem => elem.innerText)
  );

  browser.close();
  console.log(Object)
  return Object;
}

module.exports = { getLotoData }
