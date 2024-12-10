import connectDB from '@/lib/db/config/connect';
import Lesson from '@/lib/db/models/Lesson';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';

export async function GET(_: NextRequest, { params }: { params: { lessonNo: string } }) {
    try {
      await connectDB();
  
     
      const { lessonNo } = params; 
  
      const lesson = await Lesson.findById(new ObjectId(lessonNo));
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
  