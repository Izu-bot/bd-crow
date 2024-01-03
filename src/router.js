const express = require('express')
const roupasController = require('./controllers/roupasController')
const roupasMiddleware = require('./middlewares/roupasMiddlewares')

const clienteController = require('./controllers/clientesController')
const clienteMiddleware = require('./middlewares/clientesMiddlewares')

const pedidoController = require('./controllers/pedidosController')

const detalheController = require('./controllers/detalheController')
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

// Rotas de pedidos
router.get('/pedidos', pedidoController.getAll)
router.post('/pedidos', pedidoController.addPedido)
router.delete('/pedidos/:id', pedidoController.deletePedido)
router.put('/pedidos/:id', pedidoController.updatePedido)

// Rotas para o detalhes dos pedidos
router.get('/detalhe', detalheController.getAll)
router.post('/detalhe', detalheController.addDetalhe)
router.delete('/detalhe/:id', detalheController.deleteDetalhe)
router.put('/detalhe/:id', detalheController.updateDetalhe)
module.exports = router