const cron = require('node-cron');
const puppeteer = require("puppeteer")

/**
 * Executes a job every 10 seconds
 */
const executeCronJob = () => {
    cron.schedule("*/30 * * * * *", async function() {
        console.log("running a task every 10 second");
        const browser = await puppeteer.launch()
        const page = await browser.newPage()
        await page.goto("https://remoteok.io/remote-javascript-jobs")

        /* Run javascript inside the page */
        const data = await page.evaluate(() => {
            const list = []
            const items = document.querySelectorAll("tr.job")
        
            for (const item of items) {
            list.push({
                company: item.querySelector(".company h3").innerHTML,
                position: item.querySelector(".company h2").innerHTML,
                link: "https://remoteok.io" + item.getAttribute("data-href"),
            })
            }
        
            return list
        })

        console.log(data)
    });
}

module.exports = {
    executeCronJob
}