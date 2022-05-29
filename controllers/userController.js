const userSchema = require('../models/userSchema')
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {

    try {
        
        const {name, username, email, password, confirmPassword} = req.body

        const userExists = await userSchema.findOne({username: username})

        if(userExists) {
            res.statusMessage = "Email e/ou username já cadastrados"
            res.status(422).json({message: "Email e/ou username já cadastrados"})
            }
        

        if(password != confirmPassword) {
            res.statusMessage = "As senhas não conferem"
            res.status(422).json({message: "As senhas não conferem"})
            }
        
        else {
            res.statusMessage = "Usuário cadastrado com sucesso!"
            res.status(200).json({message: "Usuário cadastrado com sucesso"})
        }
        

        const newUser = new userSchema({
            name,
            username,
            email,
            password: bcrypt.hashSync(req.body.password, 10)
        })

        const savedUser = await newUser.save()

        res.status(200).json({
            message: "User adicionado com sucesso!",
            savedUser,
        })

    } catch (error) {
        res.status(500)
    }
}

const updateUserById = async (req, res) => {
    try {
        const findUser = await userSchema.findById(req.params.id)

        if (findUser) {            
            findUser.name = req.body.name || findUser.name
            findUser.email = req.body.email || findUser.email
        }

        const savedUser = await findUser.save()

        res.status(200).json({
            message: "Usuário atualizada com sucesso!",
            savedUser
        })

    } catch (error) {
        console.error(error)
    }
}

const deleteUserById = async (req, res) => {
    try {
        const userFound = await userSchema.findById(req.params.id)

       await userFound.delete()

       res.status(200).json({
           mensagem: `Usuário '${userFound.email}' deletada com sucesso!`
       })

    } catch (err) {
        res.status(400).json({
            mensagem: err.message
        })
    }
}

module.exports = {
    createUser,
    updateUserById,
    deleteUserById
}