import express from 'express'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import userRoutes from './Routes/userRoutes.js'
import db from './config/db.js'
//Crear la app
const app = express()

//Habilitar lectura de datos de formularios
app.use(express.urlencoded({extended: true}))

//Habilita cookie parser
app.use(cookieParser())

//Habilitar CSRF
app.use(csrf({cookie: true}))

//Conexión a la base de datos
try
{
    await db.authenticate();
    db.sync()
    console.log('Conexión correcta a la base de datos')
}
catch(error)
{
    console.log(error)
}

//Habilitar pug
app.set('view engine', 'pug')
app.set('views','./views')

// Carpeta publica
app.use(express.static('public'))

// Routing
// Get busca ruta en especifico
// use busca todas las rutas
app.use('/auth',userRoutes)



// Port and start
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server working in port ${port}`)
})