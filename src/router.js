const express = require('express')
const roupasController = require('./controllers/roupasController')
const roupasMiddleware = require('./middlewares/roupasMiddlewares')

const clienteController = require('./controllers/clientesController')
const clienteMiddleware = require('./middlewares/clientesMiddlewares')
const router = express.Router()

// Router dos Produtos / Roupas
router.get('/roupas', roupasController.getAll)
router.post('/roupas', roupasMiddleware.validadeBody, roupasController.createdRoupa)
router.delete('/roupas/:id', roupasController.deleteRoupa)
router.put('/roupas/:id', roupasController.updateRoupa)

// Router dos Clientes / Usuarios
router.get('/clientes', clienteController.getAll)
router.post('/clientes', clienteMiddleware.validadeBody, clienteController.addCliente)
router.delete('/clientes/:id', clienteController.deleteCliente)
router.put('/clientes/:id', clienteController.updateCLiente) 
//  Rotas da app, roupas, carrinho, conta, criarConta
module.exports = router