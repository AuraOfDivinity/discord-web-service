const { Builder, By } = require('selenium-webdriver');

const scrapeYoutubeVideosExample = async() => {
    let driver = await new Builder().forBrowser("chrome").build();
    try {

        console.log('inside scraper')
        let text = await driver.get('https://bstackdemo.com').then(res => {
            console.log('done')
        });

        console.log(text, "text")

    } finally {
    await driver.quit();
}
}


module.exports = {
    scrapeYoutubeVideosExample
}

