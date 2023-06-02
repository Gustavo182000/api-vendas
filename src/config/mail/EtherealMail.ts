import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

class EtherealMail {
  public async sendMail({ to, body }: ISendMail): Promise<void> {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = await nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const message = await transporter.sendMail({
      from: 'gustavo182000@apivendas.com.br',
      to,
      subject: 'Recuperação de senha',
      text: body,
    });

    console.log(`Mensagem enviada: ${message.messageId}`);
    console.log(`Pré visualização: : ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default EtherealMail;
