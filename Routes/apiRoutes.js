import express from 'express'
import {
    properties
} from '../Controllers/apiController.js'

const router = express.Router()

router.get('/properties', properties)

export default router