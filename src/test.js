
const { Vonage } = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "a5cd806b",
  apiSecret: "ZaH5RjdWdBebvmQE"
})
const from = "Vonage APIs"
const to = "916363202493"
const text = 'A text message sent using the Vonage SMS API'

export default async function sendSMS() {
    await vonage.sms.send({to, from, text})
        .then(resp => { console.log('Message sent successfully'); console.log(resp); })
        .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });
}

sendSMS();