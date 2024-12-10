import connectDB from '@/lib/db/config/connect';
import Lesson from '@/lib/db/models/Lesson';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Delete a lesson
export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ serverStatus: 'Error', message: 'Unauthorized' }, { status: 403 });
  }

  // Extract lessonId from query parameters
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get('lessonId');

  if (!lessonId) {
    return NextResponse.json({ serverStatus: 'Error', message: 'Lesson ID is required' }, { status: 400 });
  }

  try {
    await connectDB();
    const deletedLesson = await Lesson.findByIdAndDelete(lessonId);

    if (!deletedLesson) {
      return NextResponse.json({ serverStatus: 'Error', message: 'Lesson not found' }, { status: 404 });
    }

    return NextResponse.json({ serverStatus: 'Success', message: 'Lesson deleted' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting lesson:', error);
    return NextResponse.json({ serverStatus: 'Error', message: 'Failed to delete lesson' }, { status: 500 });
  }
}
