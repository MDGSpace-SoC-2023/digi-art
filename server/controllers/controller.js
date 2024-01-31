require('dotenv').config()
const accountSid = process.env.AUTH_SID;

const authToken = process.env.AUTH_TOKEN;
// const { Vonage } = require("@vonage/server-sdk");

// const vonage = new Vonage({
//   apiKey: "a5cd806b",
//   apiSecret: "ZaH5RjdWdBebvmQE",
// });

// await vonage.sms.send({to, from, text})
//     .then(resp => { console.log('Message sent successfully'); console.log(resp); })
//     .catch(err => { console.log('There was an error sending the messages.'); console.error(err); });

const RegisterNFT = async (req, res) => {
  // res.send('Hello, this is your backend!');
  const { phone_number, name } = req.body;
 
  const client = require('twilio')(accountSid, authToken);
 console.log("phone number is : ",phone_number)
  client.messages
    .create({
      body: `Congrats buddy! You have successfully registered your NFT. Nft name is : ${name}`,
      from: '+16782758491',
      to: `${phone_number}`
    })
    .then((message) =>{res.send(message)
       console.log(message)})
}


// const { phone_number, name } = req.body;
  // const from = "Vonage APIs";
  // const to = `${phone_number}`;
  // const text = `Congrats buddy! You have successfully registered your NFT. Nft name is : ${name}`;

  // await vonage.sms.send({ to, from, text })
  // .then((response) => {
  //   res.send(response)
  //   console.log(response.messages[0]);
  // })
  // .catch((err) => {
  //     console.log("There was an error sending the messages.");
  //     console.error(err);
  //   });

    
  ;
const NFT_Sold = async (req, res) => {
  const { phone_number, name } = req.body;
 
  const client = require('twilio')(accountSid, authToken);
 console.log("phone number is : ",phone_number)
  client.messages
    .create({
      body: `Your NFT : ${name} is sold`,
      from: '+16782758491',
      to: `${phone_number}`
    })
    .then((message) =>{res.send(message)
       console.log(message)})
  // const { phone_number, name } = req.body;
  // const from = "Vonage APIs";
  // const to = `${phone_number}`;
  // const text = `Your NFT named ${name} is sold`;
  // await vonage.sms.send({ to, from, text })
  //   .then((response) => {
  //     res.send(response)
  //     console.log(response);

  //   })
  //   .catch((err) => {
  //     console.log("Error occured during sending SOLD message")
  //     console.error(err)
  //   })


}

module.exports = {
  RegisterNFT,
  NFT_Sold
};
