"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var CouponSchema = new mongoose.Schema({
    code: String,
    amount: Number,
    type: { type: String, default: 'Discount' },
    active: { type: Boolean, default: true },
    info: String,
    minimumCartValue: Number,
    q: String
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
CouponSchema.pre('save', function (next) {
    this.q = this.code ? this.code + ' ' : '';
    this.q += this.amount ? this.amount + ' ' : '';
    this.q += this.active ? this.active + ' ' : '';
    this.q += this.info ? this.info + ' ' : '';
    this.q += this.minimumCartValue ? this.minimumCartValue + ' ' : '';
    this.q += ' ';
    next();
});
exports.default = mongoose.model('Coupon', CouponSchema);
//# sourceMappingURL=coupon.model.js.map