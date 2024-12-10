import connectDB from '@/lib/db/config/connect';
import Vocabulary from '@/lib/db/models/Vocabulary';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Add vocabulary
export async function POST(req: NextRequest, { params }: { params: { lessonNo: string } }) {
  const token = await getToken({ req });

  if (!token || token.role !== 'admin') {
    return NextResponse.json({ serverStatus: 'Error', message: 'Unauthorized' }, { status: 403 });
  }

  try {
    await connectDB();
    const { word, pronunciation, whenToSay } = await req.json();

    const vocabulary = await Vocabulary.create({
      word,
      pronunciation,
      whenToSay,
      lesson: params.lessonNo, // Associating vocabulary with a lesson
    });

    return NextResponse.json({ serverStatus: 'Success', vocabulary }, { status: 201 });
  } catch (error) {
    console.error('Error adding vocabulary:', error);
    return NextResponse.json({ serverStatus: 'Error', message: 'Failed to add vocabulary' }, { status: 500 });
  }
}
