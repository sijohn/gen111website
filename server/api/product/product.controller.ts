import Product from './product.model';
import Order from './../order/order.model';
import Category from './../category/category.model';
import BaseCtrl from './../base';
import Config from '../../config';
let config = new Config();
import * as _ from 'lodash';

export default class ProductCtrl extends BaseCtrl {
  model = Product;

  // import * as helper from './../../components/helper';

  // bestSellers = (req, res) => {
  //   let maxPrice = 0
  //   return Order.find()
  //     .sort('-variants.price')
  //     .exec(function (err, doc) {
  //       if (doc) {
  //         return Product.find().where({ active: true, approved: true })
  //         _.each(doc.variants, function (v) {
  //           if (v.price > maxPrice) maxPrice = v.price;
  //         })
  //       } else {
  //         maxPrice = 0;
  //       }
  //       return res.status(200).json({ min: 0, max: maxPrice });
  //     }
  //     );
  // }

  priceRange = (req, res) => {
    let maxPrice = 0;
    return Product.findOne()
      .where({ active: true, approved: true })
      .sort('-variants.price')
      .exec(function (err, doc) {
        if (doc) {
          _.each(doc.variants, function (v) {
            if (v.price > maxPrice) maxPrice = v.price;
          })
        } else {
          maxPrice = 0;
        }
        // let maxValue = _.max(doc.variants, 'price');
        // // let maxValue = _.max(doc.variants, _.property('price'))
        // if(maxValue){
        //   maxPrice = maxValue.price;
        // }else{
        //   maxPrice = 100000;
        // }
        // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',maxPrice, maxValue);
        return res.status(200).json({ min: 0, max: maxPrice });
      }
      );
  }

  // Gets a list of Products
  my = (req, res) => {
    let q: any = { uid: '~~~~~~~~~~~~~~~~~~~~~~~' } // Any invalid email so that no product will be displayed if there is no user info
    if (req.user) {
      if (req.user.role === 'vendor')
        q = { uid: req.user.email };
      else if (req.user.role === 'manager' || req.user.role === 'admin')
        q = {};
    }
    req.query.where = q;
    req.sort = '-updatedAt';
    this.index(req, res);
    // return Product.find(q).exec()
    //   .then(this.respondWithResult(res))
    //   .catch(this.handleError(res));
  }
  // Gets a single Product from the DB
  showDeep = (req, res) => {
    return Product.findById(req.params.id).populate({ path: 'brand' }).populate({ path: 'category' }).exec((err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }
  // // Gets a list of Products
  // search = (req, res) => {
  //   let q: any = {};
  //   let query = this.toJson(req.query);
  //   if (query) {
  //     if (this.toJson(query.where)) q = this.toJson(query.where);
  //     let select = this.toJson(query.select);
  //     let sort = query.sort;
  //     let skip = parseInt(query.skip);
  //     let limit = parseInt(query.limit);
  //     if (query.q)
  //       q = { nameLower: new RegExp(req.query.q.toLowerCase(), 'i'), active: true, approved: true };
  //   }
  //   req.query.where = q;
  //   this.index(req, res);
  //   // return Product.find(q).exec()
  //   //   .then(this.respondWithResult(res))
  //   //   .catch(this.handleError(res));
  // }

  // Get all features group
  count = (req, res) => {
    let q: any = {};
    let query = this.toJson(req.query);
    if (query) {
      if (this.toJson(query.where)) q = this.toJson(query.where);
    }
    q.active = true; q.approved = true;
    return Product.find(q).count().exec(function (err, count) {
      if (err) { return this.handleError(res, err); }
      return res.status(200).json([{ count: count }]);
    });
  }

  // // Gets a list of Products
  getAll = (req, res) => {
    let q: any = {};
    let search: any = {};
    let query = req.query;
    if (query) {
      if (query.where) q = this.toJson(query.where);
      if (query.search) search = this.toJson(query.search);
      if (search.name) q.name = new RegExp(search.name.toLowerCase(), 'i');
      let select = query.select;
      let sort = query.sort;
      let skip = parseInt(query.skip);
      let limit = parseInt(query.limit);
    }
    q.active = true; q.approved = true;
    req.query.where = q;
    this.index(req, res);
    // return Product.find(q).limit(limit).skip(skip).sort(sort).select(select).exec()
    //   .then(this.respondWithResult(res))
    //   .catch(this.handleError(res));
  }

  // // Gets a single Product from the DB
  // export function showDeep(req, res) {
  //   return Product.findById(req.params.id).populate({ path: 'brand' }).populate({ path: 'category' }).exec()
  //     .then(this.handleEntityNotFound(res))
  //     .then(this.respondWithResult(res))
  //     .catch(this.handleError(res));
  // }


  // Creates a new Product in the DB
  create = (req, res) => {
    req.body.uid = req.user.email // id change on every registration of user hence email is used so that history will be available
    req.body.vendor_id = req.user._id;
    req.body.vendor_name = req.user.name;
    req.body.vendor_email = req.user.email; // id change on every registration of user hence email is used so that history will be available
    if (config.product.moderate) req.body.approved = false; else req.body.approved = true; // If the review required modetation (server/settings/environment/shared.js)
    // let now = Date.now();
    // req.body.updated = now;
    // req.body.updated_at = now;
    // req.body.created_at = now;
    if (req.body.name)
      req.body.nameLower = req.body.name.toString().toLowerCase();
    if (!req.body.slug && req.body.name)
      req.body.slug = req.body.name.toString().toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');
    // this.create(req, res);
    return Product.create(req.body)
      .then(this.respondWithResult(res, 201))
      .catch(this.handleError(res))
  }

  // Updates an existing Product in the DB
  patch = (req, res) => {
    if (req.body._id) { delete req.body._id }
    if (req.body.approved && req.user.role === 'vendor') { delete req.body.approved } // Do not approve products by vendors unless reviewed by admin
    if (!req.body.vendor_id) req.body.vendor_id = req.user._id;
    if (!req.body.vendor_name) req.body.vendor_name = req.user.name;
    if (!req.body.vendor_email) req.body.vendor_email = req.user.email; // id change on every registration of user hence email is used so that history will be available
    // let now = Date.now();
    // req.body.updated = now;
    // req.body.updated_at = now;

    if (req.body.name)
      req.body.nameLower = req.body.name.toString().toLowerCase();

    // Just to enable checking if the category has any product
    // Category.update(
    //   {},
    //   { $pull: { products: { _id: req.params.id } } },
    //   { multi: true },
    //   function removeConnectionsCB(err, obj) {
    //     if (req.body.category) {
    //       // console.log(err,obj)
    //       Category.update(
    //         { _id: req.body.category }, // Find the category from category model
    //         { $addToSet: { 'products': { '_id': req.params.id } } }, // Update the prduct id into category model
    //         function removeConnectionsCB(err, obj) {
    //           // console.log(err,obj)
    //         }
    //       )
    //     }
    //   }
    // )
    // this.get(req, res);
    return Product.findById(req.params.id).exec()
      .then(this.handleEntityNotFound(res))
      .then(this.patchUpdates(req.body))
      .then(this.respondWithResult(res))
      .catch(this.handleError(res))
  }

}