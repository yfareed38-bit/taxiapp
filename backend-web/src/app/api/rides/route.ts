import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateRoute, calculatePrice } from '@/lib/routing';

export async function POST(req: Request) {
  try {
    const { riderId, originAddress, originLat, originLng, destAddress, destLat, destLng } = await req.json();

    const { distance, duration } = await calculateRoute(originLat, originLng, destLat, destLng);
    const price = calculatePrice(distance, duration);

    const ride = await prisma.ride.create({
      data: {
        riderId,
        originAddress,
        originLat,
        originLng,
        destAddress,
        destLat,
        destLng,
        distance,
        duration,
        price,
        status: 'REQUESTED',
      },
    });

    return NextResponse.json(ride);
  } catch (error) {
    console.error('Create ride error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const rides = await prisma.ride.findMany({
      where: status ? { status: status as any } : {},
      include: {
        rider: {
          select: { name: true, phone: true }
        },
        driver: {
          select: { name: true, phone: true }
        }
      },
      orderBy: { requestedAt: 'desc' },
    });

    return NextResponse.json(rides);
  } catch (error) {
    console.error('Get rides error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
