require('dotenv').config()

import { Resend } from 'resend';
import express, { Request, Response } from 'express';

const resend = new Resend('re_123456789');
const app = express();

app.get('/', async (req: Request, res: Response) => {
  try {
    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'delivered@resend.dev',
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
