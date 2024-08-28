import {DataTypes} from 'sequelize'
import db from '../config/db.js'
import bcrypt from 'bcrypt'

const Message = db.define('messages',{
    message: {
        type: DataTypes.STRING(255),
        allowNull: false
    }
});

export default Message