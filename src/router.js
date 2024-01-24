const express = require('express')
const router = express.Router()

const credenciaisControler = require('./controllers/credenciaisController')
const roupasRouter = require('./routes/roupasRoutes')
const clienteRouter = require('./routes/clienteRouter')

// Router de login
router.post('/login', credenciaisControler.realizarLogin)

// Rota para roupas
router.use('/roupas', roupasRouter)

// Rota para clientes
router.use('/clientes', clienteRouter)

module.exports = router