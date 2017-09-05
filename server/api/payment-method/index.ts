var express = require('express');
var controller = require('./payment-method.controller');
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
var router = express.Router();

router.get('/', controller.index);
router.get('/my', controller.my);
router.get('/active', auth.isAuthenticated(), controller.get);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.delete);

module.exports = router;
