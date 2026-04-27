import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { MapPin, Search, Navigation } from 'lucide-react-native';

export default function App() {
  const [destination, setDestination] = useState('');
  const [rideStatus, setRideStatus] = useState<string | null>(null);
  const [rideId, setRideId] = useState<string | null>(null);

  // Polling for ride status updates
  React.useEffect(() => {
    if (!rideId) return;

    const interval = setInterval(async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/rides/${rideId}`);
        const data = await response.json();
        setRideStatus(data.status);
        if (data.status === 'COMPLETED' || data.status === 'CANCELLED') {
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Polling error:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [rideId]);

  const requestRide = async () => {
    // Simulated ride request
    setRideStatus('REQUESTED');
    setRideId('temp-ride-id-123'); // This would come from actual API call
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>YASIR</Text>
        <Text style={styles.subtitle}>Rider</Text>
      </View>

      <View style={styles.mapContainer}>
        {/* Placeholder for Map */}
        <View style={styles.mapPlaceholder}>
          <Navigation size={48} color="#0056b3" />
          <Text style={styles.mapText}>
            {rideStatus ? `Ride Status: ${rideStatus}` : 'OpenStreetMap Loading...'}
          </Text>
        </View>
      </View>

      {!rideStatus ? (
        <>
          <View style={styles.searchSection}>
            <View style={styles.searchBar}>
              <Search size={20} color="#666" />
              <Text style={styles.searchText}>Where to?</Text>
            </View>
          </View>

          <View style={styles.actionSection}>
            <TouchableOpacity style={styles.button} onPress={requestRide}>
              <Text style={styles.buttonText}>Request Ride (Cash)</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.actionSection}>
          <View style={[styles.button, { backgroundColor: '#ffc107' }]}>
            <Text style={[styles.buttonText, { color: '#000' }]}>Finding Driver...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0056b3',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: -5,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholder: {
    alignItems: 'center',
  },
  mapText: {
    marginTop: 10,
    color: '#666',
  },
  searchSection: {
    padding: 20,
    position: 'absolute',
    top: 100,
    width: '100%',
  },
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  searchText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#333',
  },
  actionSection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    backgroundColor: '#0056b3',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
