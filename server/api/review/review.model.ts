

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
  q: String,
  active: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });
ReviewSchema.pre('save', function (next) {
  this.q = this.pname ? this.pname + ' ' : ''
  this.q += this.reviewer ? this.reviewer + ' ' : ''
  this.q += this.email ? this.email + ' ' : ''
  this.q += this.vendor_id ? this.vendor_id + ' ' : ''
  this.q += this.vendor_name ? this.vendor_name + ' ' : ''
  this.q += this.vendor_email ? this.vendor_email + ' ' : ''
  this.q += this.message ? this.message + ' ' : ''
  this.q += this.rating ? this.rating + ' ' : ''
  this.q += this.active ? this.active + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('Review', ReviewSchema);
