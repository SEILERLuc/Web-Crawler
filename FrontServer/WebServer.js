const path = require('path');
const express = require('express');
const app = express();

// function for the web server --> http://localhost:3001
async function frontServer() {
    // use public folder for images and css files 
    app.use(express.static(path.join(__dirname, 'public')))

    app.get('/', (req, res) => { // index page (menu)
        res.sendFile(`${__dirname}/index.html`);
    });
    app.get('/weather', (req, res) => { // page for weather
        res.sendFile(`${__dirname}/webpages/weather.html`);
    });
    app.get('/bourse', (req, res) => {
        res.sendFile(`${__dirname}/webpages/bourse.html`);
    });
    app.get('/fuel', (req, res) => {
        res.sendFile(`${__dirname}/webpages/fuel.html`);
    });
    app.get('/foot', (req, res) => {
        res.sendFile(`${__dirname}/webpages/foot.html`);
    });
    app.get('/loto', (req, res) => {
        res.sendFile(`${__dirname}/webpages/loto.html`);
    });
    app.get('/games', (req, res) => {
        res.sendFile(`${__dirname}/webpages/games.html`);
    });
    app.get('/movies', (req, res) => {
        res.sendFile(`${__dirname}/webpages/movies.html`);
    });
    app.get('/mongo', (req, res) => {
        res.sendFile(`${__dirname}/webpages/testmongo.html`);
    });


    app.listen(3001, () => {
        console.log('Application listening on port http://localhost:3001');
    });

}

frontServer()
