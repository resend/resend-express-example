require('dotenv').config()

const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const express = require('express');
const app = express();

app.get('/', async (req, res) => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: "Hello world",
      html: "<strong>It works!</strong>",
    });

    res.status(200).json(data);
  }
  catch(e) {
    res.status(400).json(e);
  }
})

app.listen(3000, () => {
  if (!process.env.RESEND_API_KEY) {
    throw `Abort: You need to define RESEND_API_KEY in the .env file.`;
  }
  
  console.log('Listening on http://localhost:3000')
})
