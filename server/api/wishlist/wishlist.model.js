"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var WishlistSchema = new mongoose.Schema({
    product: { _id: ObjectId, name: String, slug: String, keyFeatures: [] },
    variant: { _id: ObjectId, size: String, weight: String, price: Number, mrp: Number, image: String },
    uid: ObjectId, name: String, q: String, email: String
}, {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
WishlistSchema.pre('save', function (next) {
    this.q = this.uid ? this.uid + ' ' : '';
    this.q += this.name ? this.name + ' ' : '';
    this.q += this.email ? this.email + ' ' : '';
    this.q += ' ';
    next();
});
exports.default = mongoose.model('Wishlist', WishlistSchema);
//# sourceMappingURL=wishlist.model.js.map