const express = require('express')
const router = express.Router()

const autenticacao = require('../middlewares/autenticacao')
const clienteController = require('../controllers/clientesController')
const clienteMiddleware = require('../middlewares/clientesMiddlewares')

router.get('/', clienteController.getAll)
router.post('/', clienteMiddleware.validadeBody, clienteController.addCliente)
router.delete('/:id', clienteController.deleteCliente)
router.put('/:id', clienteController.updateCLiente)

module.exports = router;