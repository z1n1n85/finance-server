import nodemailer from 'nodemailer';
import {SMTP_USER, SMTP_PASSWORD} from '../const.js'

class MailService {
  constructor(smtpUser, smtpPass){
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      port: process.env.SMTP_PORT,
      secure: true,
      logger: true,
      debugger: true,
      secureConnection: false,
      auth: {
        user: smtpUser,
        pass: smtpPass
      },
      tls: {
        rejectUnauthorized: true
      }
    });
  }
  
  async sendActivationLink (to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      subject: 'Активация аккаунта «BudgetBuddy»',
      to,
      text: '',
      html:
        `
          <div>
            <h1>Добро пожаловать!</h1>
            <p>Для активация аккаунта перейдите по ссылке:</p>
            <a href="${link}">${link}</a>
          </div>
        `
    })
  }
}

export default MailService;