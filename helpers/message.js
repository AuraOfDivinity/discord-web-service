const accountSid = process.env.TWILIO_ACCOUNT_SID 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 
 

const send_twilio_message = async(number, event) => {
    console.log('inside send message')
    await client.messages 
        .create({ 
            body: `A new hackthon, ${event.name} has been published by MLH. Dates:${event.date}. Type:${event.hybrid_notes}. More Info:${event.event_link}`,  
            messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_ID,      
            to: number 
        }) 
        .then(message => console.log(message.sid)) 
        .done();
}

module.exports = {
    send_twilio_message
}