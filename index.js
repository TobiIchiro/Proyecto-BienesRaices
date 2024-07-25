import express from 'express'

//Crear la app
const app = express()

//Port and start
const port = 3000;
app.listen(port, () => {
    console.log(`Server working in port ${port}`)
})