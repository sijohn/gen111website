import * as mongoose from 'mongoose';
let ObjectId = mongoose.Schema.ObjectId;

let ProductSchema = new mongoose.Schema({
  sku: String,
  name: String,
  nameLower: String,
  slug: String,
  category: { type: ObjectId, ref: 'Category' },
  status: String,
  brand: { type: ObjectId, ref: 'Brand' },
  description: String,
  variants: [{ image: String, price: Number, mrp: Number, weight: String, size: String }],
  features: Array,
  keyFeatures: Array,
  uid: String, // can not use ObjectId for join(as of Category) as we store email here
  vendor_id: { type: ObjectId, ref: 'User' },
  vendor_name: String, // Store vendor name here
  vendor_email: String, // can not use ObjectId for join(as of Category) as we store vendor email here
  created_at: { type: Date },
  updated_at: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  approved: { type: Boolean, default: true },
  hot: { type: Boolean, default: false },
  sale: { type: Boolean, default: false },
  new: { type: Boolean, default: false }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  });
export default mongoose.model('Product', ProductSchema);
