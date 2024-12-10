// File: app/api/users/delete/route.ts

import connectDB from '@/lib/db/config/connect';
import User from '@/lib/db/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({ req });

    // Authorization check
    if (!token || token.role !== 'admin') {
      return NextResponse.json({ serverStatus: 'Error', message: 'Unauthorized access' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ serverStatus: 'Error', message: 'User ID is required' }, { status: 400 });
    }

    await connectDB();
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return NextResponse.json({ serverStatus: 'Error', message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ serverStatus: 'Success', message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ serverStatus: 'Error', message: 'Failed to delete user' }, { status: 500 });
  }
}
