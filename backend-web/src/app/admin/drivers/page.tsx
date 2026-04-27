'use client';

import React, { useEffect, useState } from 'react';
import { Car, User, Star, Phone } from 'lucide-react';

export default function DriversPage() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDrivers() {
      try {
        const res = await fetch('/api/drivers'); // You'll need to create this API
        const data = await res.json();
        setDrivers(data);
      } catch (error) {
        console.error('Failed to fetch drivers:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDrivers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Same as Dashboard */}
      <div className="w-64 bg-blue-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">YASIR Admin</h1>
        <nav className="space-y-4">
          <a href="/admin" className="flex items-center space-x-3 text-blue-200 hover:text-white cursor-pointer">
            <span>Dashboard</span>
          </a>
          <a href="/admin/drivers" className="flex items-center space-x-3 text-white font-bold cursor-pointer">
            <Car size={20} />
            <span>Drivers</span>
          </a>
        </nav>
      </div>

      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Registered Drivers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <p>Loading drivers...</p>
          ) : drivers.length === 0 ? (
            <p className="text-gray-500">No drivers registered yet.</p>
          ) : (
            drivers.map((driver: any) => (
              <div key={driver.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="h-24 bg-blue-600 relative">
                  <div className="absolute -bottom-6 left-6">
                    <div className="w-16 h-16 bg-white rounded-full border-4 border-white flex items-center justify-center overflow-hidden">
                      {driver.profileImage ? (
                        <img src={driver.profileImage} alt={driver.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="text-gray-400" size={32} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-10 p-6">
                  <h3 className="text-xl font-bold text-gray-800">{driver.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Star size={14} className="text-yellow-400 fill-current mr-1" /> {driver.rating} Rating
                  </p>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone size={14} className="mr-2" /> {driver.phone || 'No phone'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Car size={14} className="mr-2" /> {driver.vehicle?.make} {driver.vehicle?.model} ({driver.vehicle?.plateNumber})
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-blue-50 text-blue-600 font-bold py-2 rounded-lg hover:bg-blue-100 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
