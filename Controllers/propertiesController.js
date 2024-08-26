import {unlink} from 'node:fs/promises'
import {validationResult} from 'express-validator'
import {Price, Category, Property} from '../models/index.js'

const admin = async (req,res) => {

    const {pag} = req.query

    const expresion = /^[0-9]$/

    if(!expresion.test(pag)) {
        return res.redirect('/my-properties?pag=1')
    }

    try {
        const {id} = req.user

        const limit = 2
        const offset = ((pag * limit) - limit)

        const properties = await Property.findAll({
            limit: limit,
            offset,
            where: {
                userId : id
            },
            include: [
                {model: Category, as: 'category'},
                {model: Price, as: 'price'}
            ]
        })

        res.render('./properties/admin.pug',{
            pagina : 'Mis propiedades',
            properties,
            csrfToken : req.csrfToken()
        })
    } catch (error) {
        
    }

    
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

const addImage = async (req, res) => {

    const {id} = req.params
    //Validar que la propiedad exista
    const property = await Property.findByPk(id)

    if(!property){
        return res.redirect('/my-properties')
    }

    //Validar que la propiedad no esté publicda
    if(property.published){
        return res.redirect('/my-properties')
    }

    //Validar que la propiedad pertenece a quien visita la página
    if(req.user.id.toString() !== property.userId.toString()){
        return res.redirect('/my-properties')
    }

    res.render('properties/add-image.pug', {
        pagina: 'Agregar imagenes',
        csrfToken : req.csrfToken(),
        property
    })
}

const storeImage =  async (req, res, next) => {
    const {id} = req.params
    //Validar que la propiedad exista
    const property = await Property.findByPk(id)

    if(!property){
        return res.redirect('/my-properties')
    }

    //Validar que la propiedad no esté publicda
    if(property.published){
        return res.redirect('/my-properties')
    }

    //Validar que la propiedad pertenece a quien visita la página
    if(req.user.id.toString() !== property.userId.toString()){
        return res.redirect('/my-properties')
    }
    
    try{
        
        console.log(req.file)
        
        property.imagen = req.file.filename
        property.published = 1
        await property.save()
        next()
    }
    catch(error){
        console.log(error)
    }
}

const edit = async(req, res) => {
    const {id} = req.params
    //Validar que la propiedad exista
    const property = await Property.findByPk(id)

    if(!property){
        return res.redirect('/my-properties')
    }

    //Validar que la propiedad pertenece a quien visita la página
    if(req.user.id.toString() !== property.userId.toString()){
        return res.redirect('/my-properties')
    }
    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])

    res.render('./properties/edit.pug',{
        pagina : `Editar propiedad: ${property.title}`,
        csrfToken : req.csrfToken(),
        categories: categories,
        prices: prices,
        datos: property
    })
}

const saveChanges = async(req, res) => {

    //Validacion de errores
    let result = validationResult(req)
    if(!result.isEmpty()) {
        const [categories, prices] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ])
        console.log(req.body)
        return res.render('./properties/edit.pug',{
            pagina : 'Editar propiedad',
            csrfToken : req.csrfToken(),
            categories: categories,
            prices: prices,
            errors: result.array(),
            datos: req.body
        })
    }

    const {id} = req.params
    //Validar que la propiedad exista
    const property = await Property.findByPk(id)

    if(!property){
        return res.redirect('/my-properties')
    }

    //Validar que la propiedad pertenece a quien visita la página
    if(req.user.id.toString() !== property.userId.toString()){
        return res.redirect('/my-properties')
    }

    try {
        const {title, description, rooms, parking, wc, street, lat, lng, price, category: categoryId} = req.body
        
        property.set({
            title,
            description,
            rooms,
            parking,
            wc,
            street,
            lat,
            lng,
            priceId : price,
            categoryId
        })

        await property.save();
        res.redirect('/my-properties')


    }
    catch(error) {
        console.log(error)
    }
}

const deleteProperty = async (req, res) => {
    const {id} = req.params
    //Validar que la propiedad exista
    const property = await Property.findByPk(id)

    if(!property){
        return res.redirect('/my-properties')
    }

    //Validar que la propiedad pertenece a quien visita la página
    if(req.user.id.toString() !== property.userId.toString()){
        return res.redirect('/my-properties')
    }
    
    if(property.name)
        await unlink(`public/uploads/${property.imagen}`)

    await property.destroy()
    res.redirect('/my-properties')
    
}

const showProperty = async(req, res) => {
    const {id} = req.params
    const property = await Property.findByPk(id,{
        include: [
            {model: Category, as: 'category'},
            {model: Price, as: 'price'}
        ]
    })

    if(!property){
        return res.redirect('/404')
    }
    res.render('properties/show.pug' ,{
        property,
        pagina: property.title

    })
}

export {
    admin,
    add,
    save,
    addImage,
    storeImage,
    edit,
    saveChanges,
    deleteProperty,
    showProperty
}