import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const InvestorSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
});

const Investor = mongoose.models.Investor || model('Investor', InvestorSchema);

export default Investor;
