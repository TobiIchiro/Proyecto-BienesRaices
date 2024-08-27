import {Category, Price, Property} from '../models/index.js' 

const home = async (req, res) => {

    const [categories, prices] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ])
     
    res.render('home.pug',{
        pagina: 'Inicio',
        categories,
        prices
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