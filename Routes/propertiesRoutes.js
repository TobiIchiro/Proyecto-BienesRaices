import express from 'express'

import {admin,
    add
} from '../Controllers/propertiesController.js'

const router = express.Router();

router.get('/my-properties',admin)
router.get('/my-properties/add', add)

export default router