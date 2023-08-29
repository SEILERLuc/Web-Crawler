const axios = require('axios');
const cheerio = require('cheerio');
const url ="https://www.carburants.org/prix-carburants/";

async function fetchFuelData(fuel){
    console.log("Crawling data...")
    let response = await axios(url).catch((err) => console.log(err));

    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }
    const html = response.data;
    const $ = cheerio.load(html);
    const statsTable = $('.table > tbody > tr');
    statsTable.each(function() {
        let temp = {
            name: '',
            gasoil: '',
            sp98: '',
            sp95:'',
            e10:'',
            e85:'',
            gpl:'',
        };
        let title = $(this).find('td').each(function(x) {
            const data = $(this).text();
            if(x == 0) temp.name = data
            if(x == 1) temp.gasoil = data
            if(x == 2) temp.sp98 = data
            if(x == 3) temp.sp95 = data
            if(x == 4) temp.e10 = data
            if(x == 5) temp.e85 = data
            if(x == 6) temp.gpl = data
        });
        fuel.push(temp);

    });
    console.log(fuel)
    return fuel
}

module.exports = {fetchFuelData}
