"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var ContactSchema = new mongoose.Schema({
    name: String,
    photo: String,
    email: String,
    phone: String,
    category: String,
    active: Boolean,
    q: String,
    modifiedBy: String
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
ContactSchema.pre('save', function (next) {
    this.q = this.name ? this.name + ' ' : '';
    this.q += this.name ? this.name + ' ' : '';
    this.q += this.email ? this.email + ' ' : '';
    this.q += this.phone ? this.phone + ' ' : '';
    this.q += this.active ? this.active + ' ' : '';
    this.q += ' ';
    next();
});
exports.default = mongoose.model('Contact', ContactSchema);
//# sourceMappingURL=contact.model.js.map