

import * as mongoose from 'mongoose';

var FeatureSchema = new mongoose.Schema({
  key: String,
  val: String,
  info: String,
  q: String,
  active: Boolean
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });
FeatureSchema.pre('save', function (next) {
  this.q = this.key ? this.key + ' ' : ''
  this.q += this.val ? this.val + ' ' : ''
  this.q += this.info ? this.info + ' ' : ''
  this.q += this.active ? this.active + ' ' : ''
  this.q += ' '
  next();
});
export default mongoose.model('Feature', FeatureSchema);
