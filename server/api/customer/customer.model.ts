

import * as mongoose from 'mongoose';

var CustomerSchema = new mongoose.Schema({
  name: String,
  address: String,
  photo: String,
  country: String,
  active: Boolean,
  q: String,
  modifiedBy: String
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });
CustomerSchema.pre('save', function (next) {
  this.q = this.name ? this.name + ' ' : ''
  this.q += this.address ? this.address + ' ' : ''
  this.q += this.country ? this.country + ' ' : ''
  this.q += this.active ? this.active + ' ' : ''
  this.q += this.modifiedBy ? this.modifiedBy + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('Customer', CustomerSchema);
