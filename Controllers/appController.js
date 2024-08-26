import {Category} from '../models/index.js' 

const home = async (req, res) => {
     
    res.render('home.pug',{
        pagina: 'Inicio',
        categories:  await Category.findAll()
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