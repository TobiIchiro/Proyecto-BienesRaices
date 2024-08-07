
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

const forgotPassword = (req,res) => {
    res.render('./auth/forgot-pass.pug', {
        pagina : 'Recupera tu contraseña'
    })
}

export {
    formularioLogin,
    formularioSignin,
    forgotPassword
}