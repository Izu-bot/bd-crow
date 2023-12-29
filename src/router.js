const express = require('express')
const roupasController = require('./controllers/roupasController')
const roupasMiddleware = require('./middlewares/roupasMiddlewares')

const router = express.Router()

router.get('/roupas', roupasController.getAll)
router.post('/roupas', roupasMiddleware.validadeBody, roupasController.createdRoupa)
router.delete('/roupas/:id', roupasController.deleteRoupa)
router.put('/roupas/:id', roupasController.updateRoupa)


//  Rotas da app, roupas, carrinho, conta, criarConta
module.exports = router