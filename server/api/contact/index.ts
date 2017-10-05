import ContactCtrl from './contact.controller';
const controller = new ContactCtrl();
var express = require('express');
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/my', auth.isAuthenticated(), controller.index);
router.get('/:id', auth.isAuthenticated(), controller.get);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.delete);

module.exports = router;
