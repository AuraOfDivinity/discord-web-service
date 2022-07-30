const cron = require('node-cron');

/**
 * Executes a job every 10 seconds
 */
const executeCronJob = () => {
    cron.schedule("*/10 * * * * *", function() {
        console.log("running a task every 10 second");
    });
}

module.exports = {
    executeCronJob
}