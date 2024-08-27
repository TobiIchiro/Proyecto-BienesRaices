import express from 'express'
import {home,
    category,
    notFound,
    searcher} from '../Controllers/appController.js'
 

const router = express.Router()

//Inicio
router.get('/', home)

//Categorias
router.get('/categories/:id',category)

//404
router.get('/404',notFound)

//Buscador
router.post('/searcher',searcher)

export default router;