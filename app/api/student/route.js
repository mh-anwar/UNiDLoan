// General route to get data of all students
import { NextResponse } from 'next/server';
import Student from './StudentSchema';
import mongoose from 'mongoose';

export async function GET(req) {
    const query = new URL(req.url);
    const resourceType = query.searchParams.get('resourceType');
    // by default the resourceType is set to student
    const filter = resourceType ? resourceType : 'student';
    console.log(filter);
    // Get all students
    try {
        await mongoose.connect(process.env.MONGODB);
        const students = await Student.find();

        if (filter === 'student') {
            return NextResponse.json(JSON.stringify(students), { status: 200 });
        } else if (filter === 'videos') {
            // Get all video fields from every student and return
            const allVideos = students
                .map((student) => student.video)
                .filter((video) => video != null);
            return NextResponse.json(JSON.stringify(allVideos), {
                status: 200,
            });
        }
    } catch (err) {
        return new Response(JSON.stringify(err), { status: 500 });
    }
}
