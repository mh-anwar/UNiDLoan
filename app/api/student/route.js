// General route to get data of all students
import Student from './StudentSchema';
import mongoose from 'mongoose';

export async function GET(req) {
	// Get all students
	try {
		await mongoose.connect(process.env.MONGODB);
		const students = await Student.find();
		return new Response(JSON.stringify(students), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify(err), { status: 500 });
	}
}
