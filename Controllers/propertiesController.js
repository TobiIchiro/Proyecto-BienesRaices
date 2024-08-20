import Price from '../models/Price.js'
import Category from '../models/Category.js'

const admin = (req,res) => {
    res.render('./properties/admin.pug',{
        pagina : 'Mis propiedades',
        bar : true
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
        bar : true,
        categories: categories,
        prices: prices
    })
}

export {admin,
    add
}