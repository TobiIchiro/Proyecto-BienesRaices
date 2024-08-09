import { check, validationResult } from "express-validator"
import Usuario from "../models/Usuario.js"
import {generateId} from "../helpers/tokens.js"

const formularioLogin = (req,res) => {
    res.render('./auth/login.pug', {
        pagina : "Iniciar sesión"
    })
}

const formularioSignin = (req,res) => {
    res.render('./auth/signin.pug', {
        pagina : 'Crear cuenta'
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
            errors: [{msg: 'El usuario ya existe'}],
            usuario: {
                name: req.body.name,
                email: req.body.email
            }
        })
    }

    await Usuario.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        token: generateId()
    })

    //Mostrar mensaje de confirmacion
    res.render('templates/message.pug',
        {
            pagina: 'Confirmar correo',
            mensaje: 'Se ha enviado un Correo de confirmación a la dirección ingresada'
        }
    )
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
    forgotPassword
}