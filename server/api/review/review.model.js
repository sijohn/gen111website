"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var ReviewSchema = new mongoose.Schema({
    pid: ObjectId,
    pname: String,
    pslug: String,
    reviewer: String,
    email: String,
    vendor_id: { type: ObjectId, ref: 'User' },
    vendor_name: String,
    vendor_email: String,
    message: String,
    rating: Number,
    q: String,
    active: { type: Boolean, default: true },
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
ReviewSchema.pre('save', function (next) {
    this.q = this.pname ? this.pname + ' ' : '';
    this.q += this.reviewer ? this.reviewer + ' ' : '';
    this.q += this.email ? this.email + ' ' : '';
    this.q += this.vendor_id ? this.vendor_id + ' ' : '';
    this.q += this.vendor_name ? this.vendor_name + ' ' : '';
    this.q += this.vendor_email ? this.vendor_email + ' ' : '';
    this.q += this.message ? this.message + ' ' : '';
    this.q += this.rating ? this.rating + ' ' : '';
    this.q += this.active ? this.active + ' ' : '';
    this.q += ' ';
    next();
});
exports.default = mongoose.model('Review', ReviewSchema);
//# sourceMappingURL=review.model.js.map