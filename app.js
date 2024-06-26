const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const utils = require('./utils');
const cliProgress = require('cli-progress');
const colors = require('ansi-colors');

const app = express();

const baseUrl = 'https://www.unionarena-tcg.com';

async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        const stats = await fs.stat(filePath);
        return stats.size !== 0; // File exists and not empty
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false; // File does not exist
        } else {
            throw error; // Other error occurred
        }
    }
}

async function downloadImage(url, filePath) {
    const writer = (await fs.open(filePath, 'w')).createWriteStream();
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

async function fetchAndSaveCardImages(series) {
    if (DEBUG){console.log(`Started fetching images for series ${series}`);}
    
    const pMap = (await import('p-map')).default;
    
    const formattedSeries = series.replace('/', '_');
    const baseCardNumber = 120;
    const actionCardNumber = 15;

    const dirName = formattedSeries;
    const dir = path.join(__dirname, 'images', dirName);

    if (!await fs.stat(dir).catch(() => false)) {
        await fs.mkdir(dir, { recursive: true });
    }

    const downloadCardImage = async (cardId, imgUrl, altImgUrl) => {
        try {
            let exists = await fileExists(path.join(dir, `${cardId}.jpg`));
            let altExists = await (fileExists(path.join(dir, `${cardId}_p1.jpg`)) || fileExists(path.join(dir, `${cardId}_s.jpg`)));
            
            fetchedCards++;
            
            if (!exists){
                const imgResponse = await axios.head(imgUrl).catch(() => ({ status: 404 }));
                if (imgResponse.status === 200) {
                    const imgPath = path.join(dir, `${cardId}.jpg`);
                    await downloadImage(imgUrl, imgPath);
                    if (DEBUG){console.log(`Saved ${cardId}`);}
                    
                }
            } else {
                if (DEBUG){console.log(`${cardId} already exists`);}
                
            }
            
            if (altImgUrl !== ''){fetchedCards++;}
            
            if (cardId.includes('-AP')) { // If action point card
                cardId += '_s';
            } else {
                cardId += '_p1';
            }
                    
            if (altImgUrl !== '' && !altExists){
                const altImgResponse = await axios.head(altImgUrl).catch(() => ({ status: 404 }));
                if (altImgResponse.status === 200) {
                    const altImgPath = path.join(dir, `${cardId}.jpg`);
                    await downloadImage(altImgUrl, altImgPath);
                    if (DEBUG){console.log(`Saved ${cardId} as an alternate image`);}
                }
            } else {
                if (DEBUG){console.log(`${cardId} already exists or isn't required`);}
            }

        } catch (error) {
            if (error.code === 'ECONNRESET'){
                downloadCardImage(cardId, imgUrl, altImgUrl); // If an error of type ECONNRESET occured, try again
            }
        }
        
        // Update progress bar
        bar1.update(fetchedCards);
    };

    const baseCardTasks = Array.from({ length: baseCardNumber }, (_, i) => {
        const formattedNumber = (i + 1).toString().padStart(3, '0');
        const cardId = `${formattedSeries}-${formattedNumber}`;
        const imgUrl = `${baseUrl}/jp/images/cardlist/card/${cardId}.png?v5`;
        const altImgUrl = `${baseUrl}/jp/images/cardlist/card/${cardId}_p1.png?v5`;
        return () => downloadCardImage(cardId, imgUrl, altImgUrl);
    });

    const actionCardTasks = Array.from({ length: actionCardNumber }, (_, i) => {
        const formattedNumber = (i + 1).toString().padStart(2, '0');
        const cardId = `${formattedSeries}-AP${formattedNumber}`;
        const imgUrl = `${baseUrl}/jp/images/cardlist/card/${cardId}.png?v5`;
        const altImgUrl = `${baseUrl}/jp/images/cardlist/card/${cardId}_s.png?v5`;
        return () => downloadCardImage(cardId, imgUrl, altImgUrl);
    });

    const tasks = [...baseCardTasks, ...actionCardTasks];
    await pMap(tasks, task => task(), { concurrency: 10 });

    if (DEBUG){console.log(`Finished fetching images for series ${series}`);}
};

app.get('/get-card-image', async (req, res) => {
    const series = req.query.series || 'UA02BT/JJK-1';

    await fetchAndSaveCardImages(series);

    res.send(`Card images for series ${series} fetched successfully.`);
});

app.get('/fetch-all-card-images', async (req, res) => {
    // start the progress bar with a total value of 200 and start value of 0
    bar1.start(estimateCards, 0);

    const seriesList = require('./series.json');

    const pMap = (await import('p-map')).default;
    await pMap(seriesList, series => fetchAndSaveCardImages(series), { concurrency: 4 });

    // stop the progress bar
    bar1.stop();
    res.send('Card images for all series fetched successfully.');
});

const DEBUG = false;
let fetchedCards = 0;
const estimateCards = utils.getEstimateNumber()
const bar1 = new cliProgress.SingleBar({
    format: 'Fetched cards (estimation) |' + colors.cyan('{bar}') + '| {percentage}% || {value}/{total} cards',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

