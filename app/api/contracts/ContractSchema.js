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

	studentId: {
		type: String,
		required: true,
	},
	investorId: {
		type: String,
		required: true,
	},
});

const Contracts =
	mongoose.models.Contracts || model('Contracts', ContractsSchema);
export default Contracts;
