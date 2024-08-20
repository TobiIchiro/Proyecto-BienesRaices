import Price from './Price.js'
import Category from './Category.js'
import Property from './Property.js'
import Usuario from './Usuario.js'

//Price.hasOne(Property)
Property.belongsTo(Price)
Property.belongsTo(Category)
Property.belongsTo(Usuario)

export {
    Property,
    Price,
    Category,
    Usuario
}