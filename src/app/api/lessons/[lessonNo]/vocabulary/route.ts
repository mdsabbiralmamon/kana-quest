import connectDB from '@/lib/db/config/connect';
import Vocabulary from '@/lib/db/models/Vocabulary';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, context: { params: { lessonNo: string } }) {
  try {
    await connectDB();

    // @next-codemod-ignore - I am intentionally not awaiting params here
    const { lessonNo } = await context.params;  // <-- Await the params here
  
    // Fetch vocabulary for the specific lesson
    const vocabularies = await Vocabulary.find({ lesson: lessonNo });

    // Return the vocabulary data
    return NextResponse.json({
      serverStatus: 'Success',
      vocabulary: vocabularies,
    });
  } catch (error) {
    console.error('Error fetching vocabulary:', error);
    return NextResponse.json(
      { serverStatus: 'Error', message: 'Failed to fetch vocabulary' },
      { status: 500 }
    );
  }
}
