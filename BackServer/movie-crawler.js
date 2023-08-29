const puppeteer = require("puppeteer");
async function getMoviesData(Obj) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(
    "https://www.ugc.fr/cinema.html?id=56"
  );

  await page.waitForNetworkIdle();

  const movies = await page.evaluate(() => {
    let movie = [];
    let elements = document.querySelectorAll('div.band.component--cinema-list-item');
    for (element_of_movie of elements) {
      let imageElement = element_of_movie.querySelector('img.lozad.FR');
      let seanceElement = Array.from(element_of_movie.querySelectorAll('div.col-md-5 ul.component--screening-cards.no-bullets.d-flex.flex-wrap.p-0 li.position-relative.text-center button.bg--main-blue.color--white div.screening-date-wrapper div.screening-start')).map(x => x.innerText);
      if (seanceElement.length == 0) {
        seanceElement = Array.from(element_of_movie.querySelectorAll('div.col-md-5 div.container.d-flex.h-100 div.row.align-self-center.w-100 p.p--medium.m-0.color--main-blue a.color--main-blue')).map(x => x.innerText);
      }
      let result = {
        title: element_of_movie.querySelector('div.container div.row div.col-md-5.offset-md-1 div.component--film-presentation div.info-wrapper.main div.block--title.text-uppercase a.color--dark-blue').text
      }
      result.seance = seanceElement;
      if (imageElement.classList.contains("is-loaded")) {
        result.img = imageElement.src;
      } else {
        result.img = imageElement.dataset.src;
      }
      movie.push(result);
    }
    return movie;
  });
  browser.close();
  Obj = movies;
  console.log("objet", Obj)
  return Obj;
};

module.exports = { getMoviesData }
