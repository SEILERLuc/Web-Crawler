
const axios = require('axios');
const cheerio = require('cheerio');
const url ="https://www.abcbourse.com/";

async function fetchBourseData(bourse){
    console.log("Crawling data...")
    let response = await axios(url).catch((err) => console.log(err));
    
    if(response.status !== 200){
        console.log("Error occurred while fetching data");
        return;
    }

    const html = response.data;
    const $ = cheerio.load(html);
    const statsTable = $('.indexhome3 > tbody > tr');
    statsTable.each(function() {
        let temp = {
            name: '',
            price: '',
            var: '',
        };
        let title = $(this).find('td').each(function(x) {
            const data = $(this).text();
            if(x == 0) temp.name = data
            if(x == 1) temp.price = data
            if(x == 2) temp.var = data
        });
        bourse.push(temp);
    });
    console.log(bourse)
    return bourse
}

module.exports = {fetchBourseData}
