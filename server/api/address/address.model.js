"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
var AddressSchema = new mongoose.Schema({
    email: String,
    name: String,
    address: String,
    city: String,
    state: String,
    country: Object,
    zip: Number,
    phone: String,
    q: String,
    active: { type: Boolean, default: true },
    uid: { type: ObjectId, ref: 'User' }
}, {
    timestamps: true
});
AddressSchema.pre('save', function (next) {
    this.q = this.name ? this.name + ' ' : '';
    this.q += this.email ? this.email + ' ' : '';
    this.q += this.address ? this.address + ' ' : '';
    this.q += this.city ? this.city + ' ' : '';
    this.q += this.state ? this.state + ' ' : '';
    this.q += this.country ? this.country + ' ' : '';
    this.q += this.zip ? this.zip + ' ' : '';
    this.q += this.phone ? this.phone + ' ' : '';
    this.q += this.active ? this.active + ' ' : '';
    this.q += ' ';
    next();
});
exports.default = mongoose.model('Address', AddressSchema);
//# sourceMappingURL=address.model.js.map