const puppeteer = require("puppeteer");

async function getData(WEATHER){
	const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.tameteo.com/meteo_Toulouse-Europe-France-Haute+Garonne-LFBO-1-26128.html"
  );

  WEATHER.Jour = await page.evaluate(
    () => [...document.querySelectorAll('.cuando')].map(elem => elem.innerText)
  );
  WEATHER.Temperature = await page.evaluate(
    () => [...document.querySelectorAll('.temperatura')].map(elem => elem.innerText)
  );
  WEATHER.Prediction = await page.$$eval('.prediccion img[src]', imgs => imgs.map(img => img.getAttribute('src')));
  
  browser.close();

  console.log(WEATHER)
  return WEATHER;
}

module.exports = {getData}
