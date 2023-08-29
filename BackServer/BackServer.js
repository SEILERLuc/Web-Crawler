// import to use other crawlers from other files
const weather = require("./meteo-crawler")
const foot = require("./foot-crawl")
const fuel = require("./fuel-crawler.js")
const bourse = require("./bourse-crawler")
const loto = require("./lotocrawl.js")
const game = require("./game-crawler")
const movie = require("./movie-crawler")

const WEATHER = {
    Jour: "",
    Temperature: "",
    Prediction: ""
}
const FOOT = {
    lieux: "",
    horaires: ""
}
var LOTO = {
  Date: "",
  Resultat1: "",
  Resultat2: ""
}
const GAMES = {
  Title: "",
  Price: "",
  Img: []
}
var fuel_data = []
var bourse_data = []
let MOVIES = {}

weather.getData(WEATHER) // take weather data
fuel.fetchFuelData(fuel_data) // take fuel data
bourse.fetchBourseData(bourse_data) // take bourse data
foot.getFootballData(FOOT) // take foot data
loto.getLotoData(LOTO) // take loto data
game.getGameData(GAMES); // take games data
movie.getMoviesData(MOVIES).then((dataToSend) => {
  MOVIES = dataToSend
}) // take movies data

console.log(MOVIES)

// create app for the server at port 3000
const cors = require("cors");
const express = require('express');
const app = express();


// function for the back server --> http://localhost:3000
async function backServer() {
  app.use(cors());

  // send data into different routes
  app.get('/weather-api', function (req, res) {
      res.send(WEATHER);
  })
  app.get('/foot-api', function (req, res) {
    res.send(FOOT);
  })
  app.get('/fuel-api', function (req, res) {
    res.send(fuel_data);
  })
  app.get('/bourse-api', function (req, res) {
    res.send(bourse_data);
  })
  app.get('/loto-api', function (req, res) {
    res.send(LOTO);
  })
  app.get('/games-api', function (req, res) {
    res.send(GAMES);
  })
  app.get('/movies-api', function (req, res) {
    res.send(MOVIES);
  })

  app.listen(3000, function () {
  console.log('Votre app est disponible sur http://localhost:3000 !');
  })
}

backServer()