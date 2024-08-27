import { Sequelize } from 'sequelize'
import {Category, Price, Property} from '../models/index.js' 
import { title } from 'node:process'

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
        departamentos,
        csrfToken: req.csrfToken()
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
        categories,
        csrfToken: req.csrfToken()
    })

    //Obtener las propiedades de la categoría
}

const notFound = async (req, res) => {
    const categories= await Category.findAll()
    res.render('404.pug', {
        pagina: 'No encontrada',
        categories,
        csrfToken: req.csrfToken()
    })
}

const searcher = async (req,res) => {
    const {termino} = req.body
    if(!termino.trim()){
        res.redirect('back')
    }

    // consultar las propiedades
    const properties = await Property.findAll({
        where: {
            title: {
                [Sequelize.Op.like] : '%' + termino + '%'
            },
            published: 1
        },
        include: [
            {
                model: Price, as: 'price'
            }
        ]
    })
    const categories= await Category.findAll()
    res.render('search.pug', {
        pagina: 'Resultados de búsqueda',
        properties,
        categories,
        csrfToken: req.csrfToken()

    })
}

export {
    home,
    category,
    notFound,
    searcher
}