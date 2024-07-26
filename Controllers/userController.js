
const formularioLogin = (req,res) => {
    res.render('./auth/login.pug', {
    })
}

const formularioRegister = (req,res) => {
    res.render('./auth/register.pug', {
    })
}

export {
    formularioLogin,
    formularioRegister
}