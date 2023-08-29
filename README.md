js-crawler
==========

The js crawler project is a project that allows a user to take information from several websites of their choice via our website.

## Installation

```
To be able to run the crawler, several packages are requiredn to install into a terminal with these following commands : 
- Axios : npm install axios
- Cheerio : npm install cheerio
- Puppeteer : npm install puppeteer
- Cors : npm install cors
- Express : npm install express
- Ejs : npm install ejs
- Mongodb / Mongoose : npm install mongodb / npm install mongoose

```

Now, in the terminal, you can write :
cd BackServer
node BackServer.js

Open another terminal :
cd FrontServer
node WebServer.js

Now you can go to http://localhost:3001 to see the informations on different  websites.

## How does it work ?

The project is made of two parts:
- The back side that take informations and send them in localhost:3000
- The front side that fetch information from localhost:3000 to localhost:3001

The crawler provides intuitive interface to crawl links on web sites. Example:

### With axios and cherrio / With puppeteer


```javascript
const axios = require('axios');
const cheerio = require('cheerio');
const url ="https://www.abcbourse.com/";
let obj = {};
let arr = [];

fetchData(url).then( (res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const statsTable = $('.indexhome3 > tbody > tr');

```

```javascript
const puppeteer = require("puppeteer");

async function getData(WEATHER){
	const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    "https://www.tameteo.com/meteo_Toulouse-Europe-France-Haute+Garonne-LFBO-1-26128.html"
  );

```

Thanks to this piece of code, we allow the program to go to the url entered in the url variable and take everything in the path entered in the statsTable variable.

* `url` - URL of the page
* `statsTable` - body of the page (usually HTML)
* `status` - the HTTP status code

Extra information can be retrieved from the rest of the `page` fields: `error`, `response`, `body` which are identical to the ones passed to the callback of `request` invocation of the [Request](https://github.com/mikeal/request) module.
`referer` field will reference the url of the page that lead the crawler to the current page.

#### Options-based API

To create our api we use a piece of code that creates an API on port 3000. This API will allow us to retrieve our information and put it on our website.

```javascript
app.get('/movies-api', function (req, res) {
  res.send(MOVIES);
})
app.listen(3000, function () {
console.log('Votre app est disponible sur http://localhost:3000 !');
})

```
For example, here the movie-crawler create a object and send this object in localhost:3000/movies-api

#### Object

To store this information, we created objects and put the information in them. Subsequently, it is these objects that will be sent to the API and then retrieved to be sent to our website.

```javascript
const GAMES = {
  Title: "",
  Price: "",
  Img: []
}
```