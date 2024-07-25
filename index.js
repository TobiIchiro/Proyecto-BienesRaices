import express from 'express'
import userRoutes from './Routes/userRoutes.js'
//Crear la app
const app = express()

//Routing
//Get busca ruta en especifico
//use busca todas las rutas
app.use('/',userRoutes)

//Port and start
const port = 3000;
app.listen(port, () => {
    console.log(`Server working in port ${port}`)
})