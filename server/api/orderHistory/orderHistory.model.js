"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var OrderHistorySchema = new mongoose.Schema({
    uid: String,
    email: String,
    orderNo: String,
    status: String,
    comment: String,
    q: String,
    created_at: { type: Date }
});
OrderHistorySchema.pre('save', function (next) {
    var now = new Date();
    if (!this.created_at) {
        this.created_at = now;
    }
    this.q = this.uid ? this.uid + ' ' : '';
    this.q += this.email ? this.email + ' ' : '';
    this.q += this.orderNo ? this.orderNo + ' ' : '';
    this.q += this.status ? this.status + ' ' : '';
    this.q += this.comment ? this.comment + ' ' : '';
    this.q += this.created_at ? this.created_at + ' ' : '';
    this.q += ' ';
    next();
});
exports.default = mongoose.model('OrderHistory', OrderHistorySchema);
//# sourceMappingURL=orderHistory.model.js.map