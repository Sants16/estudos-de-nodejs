const router = require('express').Router()
const partyController = require('../controllers/partyController')

//! CRIA UMA FESTA
router
    .route('/parties')
    .post((req, resp) => partyController.create(req, resp))

//! LISTA TODAS AS FESTAS
router
    .route('/parties')
    .get((req, resp) => partyController.getAll(req, resp))

//! RETORNA UMA FESTA
router
    .route('/parties/:id')
    .get((req, resp) => partyController.get(req, resp))

//! DELETA UMA FESTA
router
    .route('/parties/:id')
    .delete((req, resp) => partyController.delete(req, resp))

//! ATUALIZA UMA FESTA
router
    .route('/parties/:id')
    .put((req, resp) => partyController.update(req, resp))

module.exports = router