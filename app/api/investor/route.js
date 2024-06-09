import mongoose from 'mongoose';
import Investor from './InvestorSchema';

// Individual investor route
export async function GET(req) {
	// Get one student
	const url = new URL(req.url);
	const testnetID = url.pathname.split('/')[3];

	try {
		await mongoose.connect(
			'mongodb+srv://mohammad:tAPx8Xy5gM9byEsM@cluster0.xhjlbjr.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster0'
		);
		const investor = await Investor.findOne({
			testnetId: testnetID,
		});
		return new Response(JSON.stringify(investor), { status: 200 });
	} catch (err) {
		return new Response(JSON.stringify(err), { status: 500 });
	}
}

export async function HEAD(req) {}

export async function POST(req) {
	// Create a new investor
	const body = await req.json();

	try {
		await mongoose.connect(
			'mongodb+srv://mohammad:tAPx8Xy5gM9byEsM@cluster0.xhjlbjr.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster0'
		);
		await Investor.create(body); // body should have all the required fields
		return new Response({ status: 201 });
	} catch (err) {
		if (err instanceof mongoose.Error.ValidationError) {
			return new Response(JSON.stringify(err), { status: 400 });
		} else if (err instanceof mongoose.Error) {
			return new Response(JSON.stringify(err), { status: 500 });
		}
	}
}
export async function PUT(req) {}
export async function DELETE(req) {}
