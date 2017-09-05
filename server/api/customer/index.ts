import CustomerCtrl from './customer.controller';
const controller = new CustomerCtrl();
var express = require('express');
var router = express.Router();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();

router.get('/', controller.index);
router.get('/my', auth.isAuthenticated(), controller.my);
router.get('/:id', controller.get);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.delete);

module.exports = router;
