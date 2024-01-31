
// const { Vonage } = require('@vonage/server-sdk')

// const vonage = new Vonage({
//   apiKey: "a5cd806b",
//   apiSecret: "ZaH5RjdWdBebvmQE"
// })
// const from = "Vonage APIs"
// const to = "916363202493"
// const text = 'A text message sent using the Vonage SMS API'

//  async function sendSMS() {
//     await vonage.sms.send({to, from, text})
//         .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//         .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
// }

// sendSMS();

// const accountSid = 'ACbd2e0780754865548237af0315b3d17d';
// const authToken = '30cc9d7024be5b76c60da7bf24539936';
require('dotenv').config()
const accountSid = process.env.AUTH_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
async function SendSms(){
  client.messages
  .create({
      body: 'gvghvgh',
      from: '+16782758491',
      to: '+916363202493'
  })
  .then(message => console.log(message))}

SendSms()