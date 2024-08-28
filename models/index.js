import Price from './Price.js'
import Category from './Category.js'
import Property from './Property.js'
import Usuario from './Usuario.js'
import Message  from './Message.js'

//Price.hasOne(Property)
Property.belongsTo(Price)
Property.belongsTo(Category)
Property.belongsTo(Usuario)

Message.belongsTo(Property, { foreignKey : 'propertyId'})
Message.belongsTo(Usuario, { foreignKey : 'userId'})

export {
    Property,
    Price,
    Category,
    Usuario,
    Message
}