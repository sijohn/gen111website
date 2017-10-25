"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.ObjectId;
var ProductSchema = new mongoose.Schema({
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
    uid: String,
    vendor_id: { type: ObjectId, ref: 'User' },
    vendor_name: String,
    vendor_email: String,
    created_at: { type: Date },
    updated_at: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    active: { type: Boolean, default: true },
    approved: { type: Boolean, default: true },
    hot: { type: Boolean, default: false },
    sale: { type: Boolean, default: false },
    q: String,
    new: { type: Boolean, default: false }
});
ProductSchema.pre('save', function (next) {
    this.q = this.sku ? this.sku + ' ' : '';
    this.q = this.name ? this.name + ' ' : '';
    this.q += this.description ? this.description + ' ' : '';
    this.q += this.vendor_name ? this.vendor_name + ' ' : '';
    this.q += this.status ? this.status + ' ' : '';
    this.q += ' ';
    next();
});
exports.default = mongoose.model('Product', ProductSchema);
//# sourceMappingURL=product.model.js.map