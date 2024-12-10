import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/config/connect';
import Lesson from '@/lib/db/models/Lesson';

export async function GET(req: NextRequest, context: { params: Record<string, string> }) {
  try {
    await connectDB();

    // Extract lessonNo from the context.params
    const { lessonNo } = context.params; // Ensure this is awaited, or handled correctly

    const lesson = await Lesson.findById(lessonNo);
    if (!lesson) {
      return NextResponse.json(
        { serverStatus: 'Error', message: 'Lesson not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ serverStatus: 'Success', lesson }, { status: 200 });
  } catch (error) {
    console.error('Error fetching lesson:', error);
    return NextResponse.json(
      { serverStatus: 'Error', message: 'Failed to fetch lesson' },
      { status: 500 }
    );
  }
}
