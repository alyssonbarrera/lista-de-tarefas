const userSchema = require('../models/userSchema')

const exibirTarefas = async (req, res) => {
    try {
        const User = await userSchema.findOne({_id: req.user._conditions})
        const taskUser = await User.tasks
        res.status(200).json(taskUser)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })  
    }
}

const novaTarefa = async (req, res) => {
    try {
        userSchema.findOneAndUpdate(
            {_id: req.user._conditions},
            {$push: {tasks: req.body.content}}
        ).exec()
        res.status(200).json({
            message: "Tarefa adicionada com sucesso!"
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const atualizarTarefa = async (req, res) => {
    try {
        const findTask = await taskSchema.findById(req.params.id)

        if(findTask) {
            findTask.content = req.body.content || findTask.content
        }

        const savedTask = await findTask.save()
        res.status(200).json({
            message: "Tarefa atualizada com sucesso!",
            savedTask
        })
    }  catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const concluirTarefa = async (req, res) => {
    try {
        const taskUpdate = await taskSchema.findOne({content: req.body.content})
        
        if(taskUpdate.situacao == 'aberta') {
            taskUpdate.situacao = 'concluída'
        } else {taskUpdate.situacao = 'aberta'}

        const saved = await taskUpdate.save()

        res.status(200).json({
            message: `Tarefa ${taskUpdate.content} atualizada com sucesso!`, 
            saved
        })

    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
}

const deletarTarefa = async (req, res) => {
    try {

        userSchema.findOneAndUpdate(
            {_id: req.user._conditions},
            {$pull: {tasks: req.body.content}}
        ).exec()

        res.status(200).json({
            message: `Tarefa '${req.body.content}' deletada com sucesso!`
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
        
    }
}

module.exports = {
    exibirTarefas,
    novaTarefa,
    atualizarTarefa,
    concluirTarefa,
    deletarTarefa
}