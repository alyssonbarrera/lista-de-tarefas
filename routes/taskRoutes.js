const express = require('express');
const router = express.Router();

const controller = require("../controllers/taskController")

router.get('/', controller.exibirTarefas)
router.post('/', controller.novaTarefa)
router.put('/:id', controller.atualizarTarefa)
router.put('/', controller.concluirTarefa)
router.delete('/', controller.deletarTarefa)

module.exports = router