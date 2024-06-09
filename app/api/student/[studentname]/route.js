import { NextResponse } from 'next/server';
import Student from '../StudentSchema';
import mongoose from 'mongoose';

// Individual student route
export async function GET(req) {
    // Get one student
    const url = new URL(req.url);
    const testnetID = url.pathname.split('/')[3];

    try {
        await mongoose.connect(process.env.MONGODB);
        const student = await Student.findOne({
            testnetId: testnetID,
        });
        console.log(student);
        return NextResponse.json(student, { status: 200 });
    } catch (err) {
        return NextResponse.json(JSON.stringify(err), { status: 500 });
    }
}

export async function HEAD(req) {}

export async function POST(req) {
    // Create a new student
    const body = await req.json();

    try {
        await mongoose.connect(process.env.MONGODB);
        await Student.findOneAndUpdate(body, {
            upsert: true,
            setDefaultsOnInsert: true,
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
