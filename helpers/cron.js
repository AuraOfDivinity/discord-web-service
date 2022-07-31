const cron = require('node-cron');
const puppeteer = require("puppeteer")
const {populate_upcoming_table, populate_past_table, get_all_upcoming_records, get_user_records} = require('../databse/database')
const { send_twilio_message } =require('./message')

/**
 * Executes a job every 30 seconds
 */
const executeCronJob = () => {
    cron.schedule("*/30 * * * *", async function() {
        console.log('running every 30 minutes')

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

        let scraped_upcoming_hackathon_names = []
        let stored_upcoming_hackathon_names = []
        
        let subscribed_users = await get_user_records()
        let number_array = []

        subscribed_users.forEach((user_details) => {
            number_array.push(user_details.phone_number)
        })

        data.upcoming_events.forEach((event) => {
            scraped_upcoming_hackathon_names.push(event.name)
        })

        const stored_upcoming_records = await get_all_upcoming_records()
        stored_upcoming_records.forEach((event)=> {
            stored_upcoming_hackathon_names.push(event.name)
        })

        let unique_elements = scraped_upcoming_hackathon_names.filter(function(obj) { return stored_upcoming_hackathon_names.indexOf(obj) == -1; });
        if(unique_elements.length > 0){
            let unique_hackathon_name = unique_elements[0]
            let unique_hackathon_details;

            data.upcoming_events.forEach((event) => {
                if(event.name == unique_hackathon_name){
                    unique_hackathon_details = event
                }
            })

            number_array.forEach( async(number) => {
                await send_twilio_message(number, unique_hackathon_details)
            })
        }

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