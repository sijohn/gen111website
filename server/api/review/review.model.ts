

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var ReviewSchema = new mongoose.Schema({
  pid: ObjectId,
  pname: String,
  pslug: String,
  reviewer: String, // Required as we are not joining with the User table
  email: String, // Required as we are not joining with the User table
  vendor_id: { type: ObjectId, ref: 'User' },
  vendor_name: String, // This will avoid multiple table join while populating all reviews for a particular vendor
  vendor_email: String, // This will avoid multiple table join while populating all reviews for a particular vendor
  message: String,
  rating: Number,
  active: { type: Boolean, default: true },
  created: { type: Date, default: Date.now }
});

export default mongoose.model('Review', ReviewSchema);
