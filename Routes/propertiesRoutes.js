import express from 'express'
import { body } from 'express-validator'

import {
    admin,
    add,
    save,
    addImage,
    storeImage,
    edit,
    saveChanges,
    deleteProperty
} from '../Controllers/propertiesController.js'

import protectRoute from '../middleware/protectRoute.js';
import upload from '../middleware/uploadImage.js'

const router = express.Router();

router.get('/my-properties',
    protectRoute,
    admin)

router.get('/my-properties/add',
    protectRoute,
    add)
router.post('/my-properties/add',protectRoute,
    body('title').notEmpty().withMessage('Es necesario el título del anuncio'),
    body('description')
        .notEmpty().withMessage('Es necesaria el la descripción de la propiedad')
        .isLength({ max: 200}).withMessage('La descripción es muy larga'),
    body('category').isNumeric().withMessage('Selecciona una categoría'),
    body('price').isNumeric().withMessage('Selecciona una rango de precios'),
    body('rooms').isNumeric().withMessage('Selecciona un numero de habitaciones'),
    body('parking').isNumeric().withMessage('Selecciona un numero de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona un numero de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    save)

router.get('/my-properties/add-image/:id',
    protectRoute,
    addImage)

router.post('/my-properties/add-image/:id',
    protectRoute,
    upload.single('images'),
    storeImage)

router.get('/my-properties/edit/:id',
    protectRoute,
    edit
)
router.post('/my-properties/edit/:id',
    protectRoute,
    body('title').notEmpty().withMessage('Es necesario el título del anuncio'),
    body('description')
        .notEmpty().withMessage('Es necesaria el la descripción de la propiedad')
        .isLength({ max: 200}).withMessage('La descripción es muy larga'),
    body('category').isNumeric().withMessage('Selecciona una categoría'),
    body('price').isNumeric().withMessage('Selecciona una rango de precios'),
    body('rooms').isNumeric().withMessage('Selecciona un numero de habitaciones'),
    body('parking').isNumeric().withMessage('Selecciona un numero de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona un numero de baños'),
    body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
    saveChanges)

router.post('/my-properties/delete/:id',
    protectRoute,
    deleteProperty
)
export default router