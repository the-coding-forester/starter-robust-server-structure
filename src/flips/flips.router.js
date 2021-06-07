const router = require('express').Router();
const controller = require('./flips.controller');

router.route('/').get(controller.list).post(controller.create);
router.route('/:flipId').get(controller.read);

module.exports = router;
