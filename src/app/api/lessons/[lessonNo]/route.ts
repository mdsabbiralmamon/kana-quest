import connectDB from '@/lib/db/config/connect';
import Lesson from '@/lib/db/models/Lesson';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { lessonNo: string } }) {
    try {
      await connectDB();
  
      // @next-codemod-ignore - I am intentionally not awaiting params here
      const { lessonNo } = params;  // @next-codemod-ignore
  
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
  