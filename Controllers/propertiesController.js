import {validationResult} from 'express-validator'
import {Price, Category, Property} from '../models/index.js'

const admin = async (req,res) => {

    const {id} = req.user

    const properties = await Property.findAll({
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
        properties
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

export {
    admin,
    add,
    save,
    addImage,
    storeImage
}