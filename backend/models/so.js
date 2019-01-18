import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let SO = new Schema({
    title: {
        type: String
    },
    customer: {
        type: String
    },
    salesPerson: {
        type: String
    },
    total: {
        type: Number
    },
    invoiceStatus: {
        type: String,
        default: 'Quotation'
    }
});

export default mongoose.model('SaleOrder', SO);