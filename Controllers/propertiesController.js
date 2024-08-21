import {validationResult} from 'express-validator'
import {Price, Category, Property} from '../models/index.js'

const admin = (req,res) => {
    res.render('./properties/admin.pug',{
        pagina : 'Mis propiedades'
    })
}

const add = async (req, res) => {
    //
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('./properties/add.pug',{
        pagina : 'Crear propiedad',
        csrfToken : req.csrfToken(),
        categories: categories,
        prices: prices,
        datos: {}
    })
}

const save = async (req, res) => {
    //Validación
    let result = validationResult(req)
    if(!result.isEmpty()) {
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ])
        return res.render('./properties/add.pug',{
            pagina : 'Crear propiedad',
            csrfToken : req.csrfToken(),
            categories: categories,
            prices: prices,
            errors: result.array(),
            datos: req.body
        })
    }
    
    //Crear un resgistro
    const {title, description, rooms, parking, wc, street, lat, lng, price, category: categoryId} = req.body
    const {id: userId} = req.user

    try{
        const propertySaved = await Property.create({
            title,
            description,
            rooms,
            parking,
            wc,
            street,
            lat,
            lng,
            priceId : price,
            categoryId,
            userId,
            imagen: ''
        })
        const {id} = propertySaved
        res.redirect(`/my-properties/add-image/${id}`)
    }
    catch(error){
        console.log(error)
    }

}

const addImage = (req, res) => {
    res.render('properties/add-image.pug', {
        pagina: 'Agregar imagenes'
    })
}

export {
    admin,
    add,
    save,
    addImage
}