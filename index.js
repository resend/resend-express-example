

import { Resend } from 'resend';
import express from 'express';

const resend = new Resend(!process.env.RESEND_API_KEY);
const app = express();

app.get('/', async (req, res) => {
  try {
    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['ashispandey138c@gmail.com'],
      subject: 'Hello World',
      html: '<strong>it works!</strong>',
    });

    res.status(200).json(data);
  } catch(error) {
    res.status(400).json(error);
  }
})

app.listen(3000, () => {
  if (!process.env.RESEND_API_KEY) {
    throw `Abort: You need to define RESEND_API_KEY in the .env file.`;
  }
  
  console.log('Listening on http://localhost:3000');
});
