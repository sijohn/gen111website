"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ShippingSchema = new mongoose.Schema({
    name: String,
    info: String,
    carrier: String,
    country: String,
    charge: Number,
    minWeight: Number,
    maxWeight: Number,
    freeShipping: Number,
    q: String,
    active: Boolean
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
ShippingSchema.pre('save', function (next) {
    this.q = this.name ? this.name + ' ' : '';
    this.q += this.info ? this.info + ' ' : '';
    this.q += this.carrier ? this.carrier + ' ' : '';
    this.q += this.country ? this.country + ' ' : '';
    this.q += this.active ? this.active + ' ' : '';
    this.q += ' ';
    next();
});
exports.default = mongoose.model('Shipping', ShippingSchema);
//# sourceMappingURL=shipping.model.js.map