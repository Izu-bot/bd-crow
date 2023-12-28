const express = require('express')
const roupasController = require('./controllers/roupasController')


const router = express.Router()

router.get('/roupas', roupasController.getAll)
router.post('/roupas', roupasController.createdRoupa)



//  Rotas da app, roupas, carrinho, conta, criarConta
module.exports = router