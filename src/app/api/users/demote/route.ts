import connectDB from '@/lib/db/config/connect';
import User from '@/lib/db/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function PATCH(req: NextRequest) {
  try {
    const token = await getToken({ req });

    // Authorization check
    if (!token || token.role !== 'admin') {
      return NextResponse.json({ serverStatus: 'Error', message: 'Unauthorized access' }, { status: 403 });
    }

    const { userId } = await req.json();
    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ serverStatus: 'Error', message: 'User not found' }, { status: 404 });
    }

    if (user.role === 'user') {
      return NextResponse.json({ serverStatus: 'Error', message: 'User is already a regular user' }, { status: 400 });
    }

    user.role = 'user';
    await user.save();

    return NextResponse.json({ serverStatus: 'Success', message: 'User demoted to regular user' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ serverStatus: 'Error', message: 'Failed to demote user' }, { status: 500 });
  }
}
