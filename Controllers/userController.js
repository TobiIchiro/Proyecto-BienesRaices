import { check, validationResult } from "express-validator"
import Usuario from "../models/Usuario.js"
import {generateId} from "../helpers/tokens.js"
import { emailRegistro } from "../helpers/emails.js" 
import { error } from "console"

const formularioLogin = (req,res) => {
    res.render('./auth/login.pug', {
        pagina : "Iniciar sesión"
    })
}

const formularioSignin = (req,res) => {
    console.log(req.csrfToken())
    res.render('./auth/signin.pug', {
        pagina : 'Crear cuenta',
        csrfToken : req.csrfToken()
    })
}

const signin = async (req,res) => {
    //Validacion
    await check('name').notEmpty().withMessage('Usuario vacio').run(req)
    await check('email').isEmail().withMessage('Email inválido').run(req)
    await check('password').isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('Las contraseñas no son iguales').run(req)
    let result = validationResult(req)

    //Vereficar que el resultado este vacio
    if(!result.isEmpty())
    {
        return res.render('auth/signin.pug', {
            pagina: 'Crear cuenta',
            csrfToken : req.csrfToken(),
            errors: result.array(),
            usuario: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }
    // Verificar que el usuario no este duplicado
    const existUser = await Usuario.findOne({ where : {email : req.body.email}})

    if(existUser)
    {
        return res.render('auth/signin.pug', {
            pagina: 'Crear cuenta',
            csrfToken : req.csrfToken(),
            errors: [{msg: 'El usuario ya existe'}],
            usuario: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }

    const usuario = await Usuario.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: generateId()
    })

    //Enviar email de confirmacion
    emailRegistro({
        name: usuario.name,
        email: usuario.email,
        token: usuario.token
    })

    //Mostrar mensaje de confirmacion
    res.render('templates/message.pug',
        {
            pagina: 'Confirmar correo',
            mensaje: 'Se ha enviado un Correo de confirmación a la dirección ingresada'
        }
    )
}

const verify = async (req,res) => {
    const {token} = req.params

    //Verificar si el token es valido

    const usuario = await Usuario.findOne({where: {token}})
    console.log(usuario);
    if(!usuario){
        return res.render('auth/verify-account.pug',{
        pagina: 'Error al verificar la cuenta',
        mensaje: 'Hubo un error al verificar la cuenta, intenta de nuevo',
        error: true
        })
    }

    if(usuario)
    {
        usuario.token = null;
        usuario.confirmado = true;
        await usuario.save();
        return res.render('auth/verify-account.pug',{
            pagina: 'Cuenta verificada',
            mensaje: 'Cuenta verificada exitosamente'
            })
    }
    
}
    

const forgotPassword = (req,res) => {
    res.render('./auth/forgot-pass.pug', {
        pagina : 'Recupera tu contraseña'
    })
}

export {
    formularioLogin,
    formularioSignin,
    signin,
    verify,
    forgotPassword
}