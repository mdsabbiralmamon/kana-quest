import connectDB from '@/lib/db/config/connect';
import Lesson from '@/lib/db/models/Lesson';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const lessons = await Lesson.find(); // Fetch all lessons
    return NextResponse.json({ serverStatus: 'Success', lessons }, { status: 200 });
  } catch (error) {
    console.error('Error fetching lessons:', error);
    return NextResponse.json({ serverStatus: 'Error', message: 'Failed to fetch lessons' }, { status: 500 });
  }
}
