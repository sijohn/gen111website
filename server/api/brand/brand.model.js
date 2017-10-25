"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var BrandSchema = new mongoose.Schema({
    name: String,
    slug: String,
    info: String,
    parent: String,
    image: String,
    uid: String,
    brand: Number,
    q: String,
    active: { type: Boolean, default: true }
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
BrandSchema.pre('save', function (next) {
    this.q = this.name ? this.name + ' ' : '';
    this.q += this.info ? this.info + ' ' : '';
    this.q += this.parent ? this.parent + ' ' : '';
    this.q += this.brand ? this.brand + ' ' : '';
    this.q += this.active ? this.active + ' ' : '';
    this.q += ' ';
    next();
});
exports.default = mongoose.model('Brand', BrandSchema);
//# sourceMappingURL=brand.model.js.map