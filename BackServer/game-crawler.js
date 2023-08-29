const puppeteer = require("puppeteer");

async function getGameData(Obj) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(
    "https://www.instant-gaming.com/fr/"
  );

  Obj.Title = await page.evaluate(
    () => [...document.querySelectorAll('div.item div.information div.name')].map(elem => elem.innerText.trim())
  );
  Obj.Price = await page.evaluate(
    () => [...document.querySelectorAll('div.item div.information div.price')].map(elem => elem.innerText.trim())
  );
  
  const imgToHave = await page.evaluate(() => {
    const paramImg1 = document.querySelector('div.highlights-container.parallax');
    const paramImg2 = document.querySelector('div.highlights-container.bottom-banner');

    return[...document.querySelectorAll('div.item a.cover.video img[src]', imgs => imgs.map(img.getAttribute('src')))]
    .filter(p => p.compareDocumentPosition(paramImg1) & Node.DOCUMENT_POSITION_PRECEDING && 
                 p.compareDocumentPosition(paramImg2) & Node.DOCUMENT_POSITION_FOLLOWING)
    .map(p => p.src);
  });  
  
  const imgToHave2 = await page.evaluate(() => {
    const paramImg3 = document.querySelector('div.indies-container');
    const paramImg4 = document.querySelector('div.actions-footer');

    return[...document.querySelectorAll('div.item a.cover.video img[src]', imgs => imgs.map(img.getAttribute('src')))]
    .filter(p => p.compareDocumentPosition(paramImg3) & Node.DOCUMENT_POSITION_PRECEDING && 
                 p.compareDocumentPosition(paramImg4) & Node.DOCUMENT_POSITION_FOLLOWING)
    .map(p => p.src);
  });

  const imgToHaveTotal = imgToHave.concat(imgToHave2);
  for (i = 0; i < imgToHaveTotal.length; i++) {
    Obj.Img.push(imgToHaveTotal[i])
  }

  browser.close();
  return Obj;

};

module.exports = { getGameData }
