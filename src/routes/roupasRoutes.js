const express = require('express');
const router = express.Router();

const roupasController = require('../controllers/roupasController');
const roupasMiddleware = require('../middlewares/roupasMiddlewares');

router.get('/', roupasController.getAll);
router.get('/:id', roupasController.getId);
router.post('/', roupasMiddleware.validadeBody, roupasController.createdRoupa);
router.delete('/:id', roupasController.deleteRoupa);
router.put('/:id', roupasController.updateRoupa);

module.exports = router;
