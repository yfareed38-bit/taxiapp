import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { User, MapPin, CheckCircle } from 'lucide-react-native';

export default function App() {
  const [online, setOnline] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>YASIR</Text>
        <Text style={styles.subtitle}>Driver</Text>
      </View>

      <View style={styles.mapContainer}>
        {/* Placeholder for Map */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Driver Map View (OSM)</Text>
        </View>
      </View>

      <View style={styles.statusSection}>
        <View style={styles.statusCard}>
          <Text style={styles.statusTitle}>You are {online ? 'Online' : 'Offline'}</Text>
          <TouchableOpacity 
            style={[styles.statusToggle, { backgroundColor: online ? '#dc3545' : '#28a745' }]}
            onPress={() => setOnline(!online)}
          >
            <Text style={styles.buttonText}>{online ? 'Go Offline' : 'Go Online'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {online && (
        <View style={styles.requestSection}>
          <View style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <User size={24} color="#0056b3" />
              <Text style={styles.requestName}>New Ride Request!</Text>
            </View>
            <View style={styles.requestDetails}>
              <MapPin size={18} color="#666" />
              <Text style={styles.requestLocation}>Main Street 123</Text>
            </View>
            <Text style={styles.price}>Estimate: Rs. 450</Text>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonText}>Accept Ride</Text>
            </TouchableOpacity>
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
    color: '#28a745', // Green for driver
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
    color: '#666',
  },
  statusSection: {
    position: 'absolute',
    top: 100,
    width: '100%',
    padding: 20,
  },
  statusCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusToggle: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  requestSection: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    padding: 20,
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  requestHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  requestName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  requestDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  requestLocation: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  price: {
    fontSize: 18,
    color: '#0056b3',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  acceptButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
