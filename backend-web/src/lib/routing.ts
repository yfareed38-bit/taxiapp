export async function calculateRoute(startLat: number, startLng: number, endLat: number, endLng: number) {
  try {
    const url = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=false`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.code !== 'Ok') {
      throw new Error('Routing failed');
    }

    const distance = data.routes[0].distance / 1000; // convert to km
    const duration = data.routes[0].duration / 60; // convert to minutes

    return { distance, duration };
  } catch (error) {
    console.error('Routing error:', error);
    return { distance: 5, duration: 15 }; // Fallback values
  }
}

export function calculatePrice(distance: number, duration: number) {
  const baseFare = 100;
  const perKm = 50;
  const perMinute = 10;

  const total = baseFare + (distance * perKm) + (duration * perMinute);
  return Math.round(total);
}
