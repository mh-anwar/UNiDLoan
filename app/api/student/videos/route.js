// General route to get data of all students
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Student from '../StudentSchema';

export async function GET(req) {
    try {
        await mongoose.connect(process.env.MONGODB);
        const students = await Student.find();
        // Get all video fields from every student and return
        const allVideos = students
            .map((student) => student.video)
            .filter((video) => video != null);
        return NextResponse.json(JSON.stringify(allVideos), {
            status: 200,
        });
    } catch (err) {
        return new Response(JSON.stringify(err), { status: 500 });
    }
}
