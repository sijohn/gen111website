let express = require('express');
import ProductCtrl from './product.controller';
let controller = new ProductCtrl();
import AuthService from '../../auth/auth.service';
let auth = new AuthService();
let router = express.Router();

router.get('/', controller.getAll);
// router.get('/search', controller.search);
router.get('/my', auth.hasRole('vendor'), controller.my);
router.get('/count', controller.count);
router.get('/priceRange', controller.priceRange);
router.get('/:id', controller.get);
router.get('/deep/:id', controller.showDeep);
// router.get('/best-sellers', controller.bestSellers);
router.post('/', auth.hasRole('vendor'), controller.create);
router.put('/:id', auth.hasRole('vendor'), controller.patch);
router.patch('/:id', auth.hasRole('vendor'), controller.patch);
router.delete('/:id', auth.hasRole('vendor'), controller.delete);

module.exports = router;
