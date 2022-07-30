const cron = require('node-cron');
const puppeteer = require("puppeteer")
const {populate_upcoming_table, populate_past_table, get_all_upcoming_records} = require('../databse/database')

/**
 * Executes a job every 30 seconds
 */
const executeCronJob = () => {
    cron.schedule("*/1 * * * *", async function() {
        console.log('running every 1 minute')

        try{
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

        console.log(data.upcoming_events, 'upcoming_events')
        console.log(data.past_events, 'past_events')
        browser.close();

        await populate_upcoming_table(data.upcoming_events)
        await populate_past_table(data.past_events)
        }catch(e){
            console.log(e, "error in cron")
        }
    });
}

module.exports = {
    executeCronJob
}