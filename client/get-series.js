const axios = require('axios');
const cheerio = require('cheerio');

const searchUrl = 'https://www.unionarena-tcg.com/jp/cardlist/index.php';

async function fetchSeriesNames() {
    try {
        const formData = new URLSearchParams({
            freewords: '001',
            selectTitle: '',
            needEnergy_min: '',
            needEnergy_max: '',
            bp_min: '',
            bp_max: '',
            keyeffect: '',
            triggerEffectType: '',
            attribute: '',
            series: '',
            parallelFlag: 'on'
        });

        const options = {
            method: 'post',
            url: searchUrl,
            data: formData.toString(),
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Accept-Language': 'ja',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://www.unionarena-tcg.com',
                'Referer': 'https://www.unionarena-tcg.com/jp/cardlist/index.php?',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
            },
        };

        const response = await axios(options);
        
        // Log the response status code
        console.log('Response:', response.data);

        // Assuming the response data is in HTML format
        const $ = cheerio.load(response.data);
        
        // Extract series names from the response
        const seriesNames = [];
        $('.modalCardDataOpen').each((index, element) => { // Update selector based on the actual HTML structure
            const seriesName = $(element).attr('alt');
            seriesNames.push(seriesName);
        });

        console.log(seriesNames);
    } catch (error) {
        console.error('Error fetching series names:', error);
    }
}

fetchSeriesNames();
