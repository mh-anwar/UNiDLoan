import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

const StudentSchema = new Schema({
	linkedin: {
		type: String,
		required: true,
	},
	testnetId: {
		type: String,
		required: true,
	},
	privateKey: {
		type: String,
		required: true,
	},
	performance: [
		{
			assignment: String,
			grade: Number,
		},
	],
	bio: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	video: {
		type: String,
		required: true,
	},
});

const Student = mongoose.models.Student || model('Student', StudentSchema);

export default Student;
