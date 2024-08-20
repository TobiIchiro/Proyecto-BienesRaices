import {DataTypes} from 'sequelize'
import db from '../config/db.js'
import bcrypt from 'bcrypt'

const Category = db.define('categories',{
    name: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
});

export default Category