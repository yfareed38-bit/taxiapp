import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status, driverId } = await req.json();
    const rideId = params.id;

    const data: any = { status };
    if (driverId) data.driverId = driverId;

    // Set timestamps based on status
    if (status === 'ACCEPTED') data.acceptedAt = new Date();
    if (status === 'IN_PROGRESS') data.startedAt = new Date();
    if (status === 'COMPLETED') data.completedAt = new Date();

    const updatedRide = await prisma.ride.update({
      where: { id: rideId },
      data,
    });

    return NextResponse.json(updatedRide);
  } catch (error) {
    console.error('Update ride error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const ride = await prisma.ride.findUnique({
      where: { id: params.id },
      include: {
        rider: true,
        driver: true,
      },
    });

    if (!ride) {
      return NextResponse.json({ error: 'Ride not found' }, { status: 404 });
    }

    return NextResponse.json(ride);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
