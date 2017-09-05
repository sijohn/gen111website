

import * as mongoose from 'mongoose';
var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var MediaSchema = new mongoose.Schema({
  originalFilename: String,
  src: String,
  path: String,
  size: String,
  type: String,
  name: String,
  uid: { type: ObjectId, ref: "User" },
  createdAt: { type: Date },
  updatedAt: { type: Date, default: Date.now },
  uname: String,
  uemail: String,
  use: String,
  active: { type: Boolean, default: true }
});

MediaSchema.pre('save', function (next) {
  var now = new Date();
  if (!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

export default mongoose.model('Media', MediaSchema);
