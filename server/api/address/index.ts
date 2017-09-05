import AddressController from './address.controller';
const controller = new AddressController();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
var express = require('express');
var router = express.Router();

router.get('/my', auth.isAuthenticated(), controller.my);
router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.get);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.delete);

module.exports = router;
