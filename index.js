import express from 'express'
import userRoutes from './Routes/userRoutes.js'
//Crear la app
const app = express()

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
const port = 3000;
app.listen(port, () => {
    console.log(`Server working in port ${port}`)
})