const nodemailer = require('nodemailer')

const sendEmail = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount()

  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'cletus.bahringer28@ethereal.email',
      pass: '4N2qv22DDhjtVzAXHp',
    },
  })

  let info = await transporter.sendMail({
    from: '"Coding Addict" <fatima.s.badran@gmail.com>', // sender address
    to: 'bar@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    html: '<h2>Sending Emails by Node.js</h2>', // html body
  })

  res.json(info)
}

module.exports = sendEmail
