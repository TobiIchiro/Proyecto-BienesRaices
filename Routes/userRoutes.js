import express from 'express';

const router = express.Router();

router.get('/', (req,res) => {
    res.json({'msg':'Hola Mundo'})
})

router.get('/nosotros', (req, res) => {
    res.json({'Encabezado':'Informacion de nosotros'})
})

export default router