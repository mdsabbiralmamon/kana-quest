import connectDB from '@/lib/db/config/connect';
import Lesson from '@/lib/db/models/Lesson';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { lessonNo: string } }) {
  try {
    await connectDB();

    // Extract lessonNo from the params
    const { lessonNo } = params;

    // Find the lesson using the provided `lessonNo`
    const lesson = await Lesson.findById(lessonNo);
    if (!lesson) {
      return NextResponse.json(
        { serverStatus: 'Error', message: 'Lesson not found' },
        { status: 404 }
      );
    }

    // Return only the lesson details
    return NextResponse.json({ serverStatus: 'Success', lesson }, { status: 200 });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { serverStatus: 'Error', message: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}