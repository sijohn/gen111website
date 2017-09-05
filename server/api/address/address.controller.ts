import Address from './address.model';
import BaseCtrl from './../base';

export default class AddressCtrl extends BaseCtrl {
  model = Address;
  my = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
}
