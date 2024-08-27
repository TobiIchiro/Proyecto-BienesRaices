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

const category = (req, res) => {

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