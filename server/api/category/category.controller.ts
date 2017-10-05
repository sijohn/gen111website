import Category from './category.model';
import BaseCtrl from './../base';
import { each, has, pull } from 'lodash';

export default class CategoryCtrl extends BaseCtrl {
  model = Category;
  my = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }
  create = (req, res) => {
    req.body.uid = req.user._id;
    this.insert(req, res);
  }
  remove = (req, res) => {
    req.body.uid = req.user._id;
    Category.update({}, { $pull: { children: { _id: req.params.id } } }, { multi: true }).exec()
      .then(this.handleEntityNotFound(res))
      .then(this.removeEntity(res))
      .catch(this.handleError(res));
  }

  index = (req, res) => {
    return Category.find().exec((err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }

  // Gets a list of Categories
  orphans = (req, res) => {
    req.query.where = { children: null };
    this.index(req, res);
  }

  // Get only those categories which has a product ** Not working
  loaded = (req, res) => {
    return Category.find({ parent: null }).
      populate({
        path: 'children', match: { products: { $exists: true, $ne: [] } }, populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children', populate: ({ path: 'children' }) }) }) }) }) }) }) })
      }).sort('-name').exec((err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
      });
  }

  // Gets a list of Categories
  all = (req, res) => {
    return Category.find({}).sort({ name: 1 }).exec((err, docs) => {
      let allCategories = []
      for (let d of docs) {
        allCategories = allCategories.concat(d.children)
      }
      if (err) { return console.error(err); }
      res.json(allCategories);
    });
  }

  path = (req, res) => {
    return Category.find({ _id: req.params.category }).
      populate({
        path: 'parent',
        // Get categories of categories - populate the 'categories' array for every category
        populate: [{ path: 'parent' }, { path: 'children' }]
      }).exec((err, docs) => {
        if (err) { return console.error(err); }
        res.json(docs);
      });
  }

  put = (req, res) => {
    Category.remove({}, function () {
      Category.insertMany(req.body)
        .then(function (mongooseDocuments) {
          res.status(200).json({});
        })
        .catch(function (err) {
        });
    });
  }

  patch = (req, res) => {
  }
}