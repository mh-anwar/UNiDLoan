import mongoose from 'mongoose';
import Contracts from './ContractSchema';
import { NextResponse } from 'next/server';
import Investor from '../investor/InvestorSchema';
import Student from '../student/StudentSchema';

// Get all by studentId
export async function GET(req) {
    const query = new URL(req.url);
    const studentId = query.searchParams.get('studentId');
    const investorId = query.searchParams.get('investorId');
    // e.g. /api/contracts?studentId=1234&type=student
    // or /api/contracts?investorId=1234&type=investor
    const filter = studentId ? { studentId } : { investorId };
    // Check if studentId or investorId is in the query
    try {
        await mongoose.connect(process.env.MONGODB);
        // Fetch the contracts without modifying the read field
        const contracts = await Contracts.find(filter).lean();

        // Clone the contracts for updating the read field
        const contractIds = contracts.map((contract) => contract._id);

        // Update the read field to true for all fetched contracts
        await Contracts.updateMany(
            { _id: { $in: contractIds } },
            { read: true }
        );

        return NextResponse.json(contracts, { status: 200 });
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
        await mongoose.connect(process.env.MONGODB);
        await Contracts.create({
            ...body,
        }); // body should have all the required fields
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
