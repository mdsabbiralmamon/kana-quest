import connectDB from '@/lib/db/config/connect';
import Lesson from '@/lib/db/models/Lesson';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Add a lesson
export async function POST(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ serverStatus: 'Error', message: 'Unauthorized' }, { status: 403 });
  }

  try {
    await connectDB();
    const { title, description } = await req.json();

    const lesson = await Lesson.create({ title, description });
    return NextResponse.json({ serverStatus: 'Success', lesson }, { status: 201 });
  } catch (error) {
    console.error('Error adding lesson:', error);
    return NextResponse.json({ serverStatus: 'Error', message: 'Failed to add lesson' }, { status: 500 });
  }
}
