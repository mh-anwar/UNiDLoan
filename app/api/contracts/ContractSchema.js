import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';
const ContractsSchema = new Schema({
    loanAmount: {
        type: Number,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    message: {
        type: String,
        required: true,
    },
    studentId: {
        type: String,
        required: true,
    },
    investorId: {
        type: String,
        required: true,
    },
    read: {
        type: Number,
        default: 0,
        // on first offer, the student has to read the contract
        // on second and future offers this will be set to true
    },
    /*   investorName: {
        type: String,
        required: true,
    }, */
    studentName: {
        type: String,
        required: true,
    },
});

const Contracts =
    mongoose.models.Contracts || model('Contracts', ContractsSchema);
export default Contracts;
