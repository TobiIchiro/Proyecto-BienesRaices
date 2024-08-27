import { where } from 'sequelize'
import {Category, Price, Property} from '../models/index.js' 

const home = async (req, res) => {

    const [categories, prices, casas, departamentos] = await Promise.all([
        Category.findAll(),
        Price.findAll(),
        Property.findAll({
            limit : 5,
            where : {
                categoryId : 1,
                published: 1
            },
            include : [
                {
                model: Price,
                as: 'price'
            }],
            order : [
                ['createdAt','DESC']
            ]
        }),
        Property.findAll({
            limit : 5,
            where : {
                categoryId : 2,
                published: 1
            },
            include : [
                {
                model: Price,
                as: 'price'
            }],
            order : [
                ['createdAt','DESC']
            ]
        })
    ])
     
    res.render('home.pug',{
        pagina: 'Inicio',
        categories,
        prices,
        casas,
        departamentos
    })
}

const category = async (req, res) => {
    const {id} = req.params

    //Comprobar que la categoría exista
    const categories = await Category.findAll()
    const category = await Category.findByPk(id)
    if(!category){
        return res.redirect('/404')
    }

    const properties = await Property.findAll({
        where: {
            categoryId: id,
            published : 1
        },
        include: [{
            model: Price,
            as: 'price' 
        }]
    })
    res.render('category.pug',{
        pagina: category.name+'s',
        properties,
        categories
    })

    //Obtener las propiedades de la categoría
}

const notFound = (req, res) => {

}

const searcher = (req,res) => {

}

export {
    home,
    category,
    notFound,
    searcher
}