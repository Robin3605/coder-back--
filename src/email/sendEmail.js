import nodemailer from "nodemailer";


export const sendEmail = async (template, subject, email) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Configuramos el envío del correo electrónico

  await transport.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: template,
    // attachments:[
    //   {
    //     filename: "gatito.jpg",
    //     path:"public/images/gatito.jpg",
    //     cid: "gatito"
    //   }
    // ]
  });
};
