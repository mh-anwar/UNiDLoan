import mongoose from 'mongoose';
import Contracts from './ContractSchema';

// Get all by studentId
export async function GET(req) {
	const query = new URL(req.url);
	// e.g. /api/contracts?studentId=1234 or /api/contracts?investorId=1234

	// Check if studentId or investorId is in the query
	try {
		await mongoose.connect(
			'mongodb+srv://mohammad:tAPx8Xy5gM9byEsM@cluster0.xhjlbjr.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster0'
		);
		if (query.searchParams.get('studentId')) {
			const contracts = await Contracts.find({
				studentId: query.searchParams.get('studentId'),
			});
			console.log(contracts);
			return new Response(JSON.stringify(contracts), { status: 200 });
		} else {
			const contracts = await Contracts.find({
				investorId: query.searchParams.get('investorId'),
			});
			return new Response(JSON.stringify(contracts), { status: 200 });
		}
	} catch (err) {
		return new Response(JSON.stringify(err), { status: 500 });
	}
}

// Get all by investorId

export async function HEAD(req) {}

export async function POST(req) {
	// Create a new investor
	const body = await req.json();

	try {
		await mongoose.connect(
			'mongodb+srv://mohammad:tAPx8Xy5gM9byEsM@cluster0.xhjlbjr.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster0'
		);
		await Contracts.create(body); // body should have all the required fields
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
