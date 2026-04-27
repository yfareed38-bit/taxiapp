import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const drivers = await prisma.user.findMany({
      where: { role: 'DRIVER' },
      include: {
        vehicle: true,
      },
    });

    return NextResponse.json(drivers);
  } catch (error) {
    console.error('Get drivers error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
