// General route to get data of all students
import Student from './StudentSchema';
import mongoose from 'mongoose';

export async function GET(req) {
	// Get all students
	try {
		await mongoose.connect(
			'mongodb+srv://mohammad:tAPx8Xy5gM9byEsM@cluster0.xhjlbjr.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster0'
		);
		const students = await Student.find();
		return new Response(JSON.stringify(students), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify(err), { status: 500 });
	}
}
