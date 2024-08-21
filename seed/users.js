import bcrypt from 'bcrypt'

const users = [
    {
        name: 'admin',
        email: 'admin@bn.com',
        password: bcrypt.hashSync('admin1',10),
        confirmado: 1

    }
]

export default users