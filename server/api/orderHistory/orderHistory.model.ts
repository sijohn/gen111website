

import * as mongoose from 'mongoose';

var OrderHistorySchema = new mongoose.Schema({
  uid: String,
  email: String,
  orderNo: String,
  status: String,
  comment: String,
  created_at: { type: Date }
});

OrderHistorySchema.pre('save', function (next) {
  var now = new Date();
  if (!this.created_at) {
    this.created_at = now;
  }
  next();
});

export default mongoose.model('OrderHistory', OrderHistorySchema);