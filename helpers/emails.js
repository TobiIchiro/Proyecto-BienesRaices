import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
      });

      const { email, name, token } = datos

      await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Confirma tu cuenta en BienesRaices.com',
        text: 'Confirma tu cuenta en BienesRaices.com',
        html: `
            <p>Hola ${name}, verifica tu cuenta en BienesRaices.com</p>
            <p> Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
            <a href="${process.env.URL_BACKEND}:${process.env.PORT ?? 3000}/auth/verify/${token}">Confirma tu cuenta</a> </p>
            
            <p> Si tu no creaste la cuenta has caso omiso a este mensaje </p>
            `
      })
}

const emailResetPassword = async (datos) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
      });
    
      const {email, name, token} = datos

      await transport.sendMail({
        from: 'BienesRaices.com',
        to: email,
        subject: 'Reestablece tu contraseña de BienesRaices.com',
        text: 'Reestablece tu contraseña de BienesRaices.com',
        html: `
            <p>Hola ${name}, has solicitado reestablecer tu contraseña de BienesRaices.com</p>
            <p> Para reestablecer tu contraseña, solo debes confirmarla en el siguiente enlace:
            <a href="${process.env.URL_BACKEND}:${process.env.PORT ?? 3000}/auth/forgot-pass/${token}">Confirma tu cuenta</a> </p>
            
            <p> Si tu no creaste la cuenta has caso omiso a este mensaje </p>
            `
      })
}

export {
    emailRegistro,
    emailResetPassword
}