const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: 
  {
    user: 'devipriyankagunturu@gmail.com',
    pass: 'gunturu@2002',
  },
});

app.post('/send-email', (req, res) => {
  const { to, subject, body } = req.body;

  const mailOptions = {
    from: 'devipriyankagunturu@gmail.com',
    to,
    subject,
    text: body,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
