const cron = require('node-cron');
const puppeteer = require("puppeteer")

/**
 * Executes a job every 30 seconds
 */
const executeCronJob = () => {
    cron.schedule("*/10 * * * * *", async function() {
        console.log('running every 30 secs')

        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto("https://mlh.io/seasons/2023/events", {waitUntil: 'networkidle0'})

        /* Run javascript inside the page */
        const data = await page.evaluate(() => {
            const items = document.querySelectorAll("div.row")
        
            let upcoming_events = []
            let past_events = []

            items.forEach((row, index)=> {
                let events;
                switch(index){
                    case 1:
                        events = row.querySelectorAll('div.event')
                        events.forEach((event) => {
                            upcoming_events.push({
                                name: event.querySelector('h3.event-name').innerHTML,
                                date: event.querySelector('p.event-date').innerHTML,
                                city: event.querySelector('span[itemprop="city"]').innerHTML,
                                state: event.querySelector('span[itemprop="state"]').innerHTML,
                                hybrid_notes: event.querySelector('div.event-hybrid-notes > span').innerHTML,
                                image_url: event.querySelector('div.image-wrap > img').getAttribute('src'),
                                event_link: event.querySelector('a').getAttribute('href')
                            })
                        })
                        break;
                    case 2:
                        events = row.querySelectorAll('div.event')
                        events.forEach((event) => {
                            past_events.push({
                                name: event.querySelector('h3.event-name').innerHTML,
                                date: event.querySelector('p.event-date').innerHTML,
                                city: event.querySelector('span[itemprop="city"]').innerHTML,
                                state: event.querySelector('span[itemprop="state"]').innerHTML,
                                hybrid_notes: event.querySelector('div.event-hybrid-notes > span').innerHTML,
                                image_url: event.querySelector('div.image-wrap > img').getAttribute('src'),
                                event_link: event.querySelector('a').getAttribute('href')
                            })
                        })
                        break;
                }
            })
        
            return {
                upcoming_events,
                past_events
            }
        })
    });
}

module.exports = {
    executeCronJob
}