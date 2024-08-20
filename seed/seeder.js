import categories from './categories.js'
import prices from './prices.js'
import db from '../config/db.js'
import {Category, Price, Property} from '../models/index.js'
import { promises } from 'dns'
import { truncate } from 'fs'

const importData = async () => {
    try 
    {
        //Autenticar
        await db.authenticate()
        //Generar las columnas
        await db.sync()
        //Insertar los datos
        /*
        Cuando las bases de datos dependen de la otra se utiliza await
        await Category.bulkCreate(categories)
        await Price.bulkCreate(prices)*/

        //Bases de datos independientes
        await Promise.all([Category.bulkCreate(categories), Price.bulkCreate(prices)])

        console.log('Datos importados correctamente')
        process.exit()
    }
    catch (error)
    {
        console.log(error)
        process.exit(1)
    }
}

const deleteData = async () => {
    try
    {
        /*await Promise.all([
            Category.destroy({where: {}, truncate: true}),
            Price.destroy({where: {}, truncate: true})
        ])*/
        await db.sync({force: true})
        process.exit()
    }
    catch(error)
    {
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] === "-i")
{
    importData();
}
if(process.argv[2] === "-d")
{
    deleteData();
}