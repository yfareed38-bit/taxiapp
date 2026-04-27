import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { driverId, make, model, year, plateNumber, color, type } = await req.json();

    const vehicle = await prisma.vehicle.create({
      data: {
        driverId,
        make,
        model,
        year,
        plateNumber,
        color,
        type,
      },
    });

    return NextResponse.json(vehicle);
  } catch (error) {
    console.error('Create vehicle error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
