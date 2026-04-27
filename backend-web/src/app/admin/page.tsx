'use client';

import React, { useEffect, useState } from 'react';
import { LayoutDashboard, Users, Car, MapPin, Clock } from 'lucide-react';

export default function AdminDashboard() {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRides() {
      try {
        const res = await fetch('/api/rides');
        const data = await res.json();
        setRides(data);
      } catch (error) {
        console.error('Failed to fetch rides:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRides();
    const interval = setInterval(fetchRides, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">YASIR Admin</h1>
        <nav className="space-y-4">
          <div className="flex items-center space-x-3 text-blue-200 hover:text-white cursor-pointer">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </div>
          <div className="flex items-center space-x-3 text-blue-200 hover:text-white cursor-pointer">
            <Users size={20} />
            <span>Users</span>
          </div>
          <div className="flex items-center space-x-3 text-blue-200 hover:text-white cursor-pointer">
            <Car size={20} />
            <span>Drivers</span>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">Active Rides</h2>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
            <span className="text-sm text-gray-500">Live Updates Enabled</span>
          </div>
        </header>

        <div className="grid gap-6">
          {loading ? (
            <p>Loading rides...</p>
          ) : rides.length === 0 ? (
            <p className="text-gray-500">No rides found.</p>
          ) : (
            rides.map((ride: any) => (
              <div key={ride.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <MapPin className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{ride.originAddress} ➔ {ride.destAddress}</h3>
                    <p className="text-sm text-gray-500 flex items-center">
                      <Clock size={14} className="mr-1" /> {new Date(ride.requestedAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    ride.status === 'REQUESTED' ? 'bg-yellow-100 text-yellow-700' :
                    ride.status === 'ACCEPTED' ? 'bg-blue-100 text-blue-700' :
                    ride.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {ride.status}
                  </span>
                  <p className="mt-2 font-bold text-lg text-blue-600">Rs. {ride.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
