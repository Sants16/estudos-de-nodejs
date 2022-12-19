const router = require('express').Router()
const serviceController = require('../controllers/serviceController')

//! REGISTRA UM NOVO SERVIÇO
router
    .route('/services')
    .post((req, resp) => serviceController.create(req, resp))

//! EXIBE TODOS OS SERVIÇOS
router
    .route('/services')
    .get((req, resp) => serviceController.getAll(req, resp))

//! EXIBE UM SERVIÇO
router
    .route('/services/:id')
    .get((req, resp) => serviceController.get(req, resp))

//! DELETA UM SERVIÇO
router
    .route('/services/:id')
    .delete((req, resp) => serviceController.delete(req, resp))

//! ATUALIZA UM SERVIÇO
router
    .route('/services/:id')
    .put((req, resp) => serviceController.update(req, resp))

module.exports = router