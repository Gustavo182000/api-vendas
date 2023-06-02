import nodemailer from 'nodemailer';
import HandlebarsMailTemplate from './HandlebarsMailTemplate';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IPaserMailTemplate {
  template: string;
  variables: ITemplateVariable;
}

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IPaserMailTemplate;
}

class EtherealMail {
  public async sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMail): Promise<void> {
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

    const mailTemplate = new HandlebarsMailTemplate();

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@apivendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await mailTemplate.parser(templateData),
    });

    console.log(`Mensagem enviada: ${message.messageId}`);
    console.log(`Pré visualização: : ${nodemailer.getTestMessageUrl(message)}`);
  }
}

export default EtherealMail;
