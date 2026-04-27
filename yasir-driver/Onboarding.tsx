import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    plateNumber: '',
    color: '',
    type: 'Sedan',
  });

  const handleSubmit = async () => {
    // API call to register vehicle
    onComplete();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vehicle Information</Text>
      <Text style={styles.subtitle}>Enter your taxi details to start driving</Text>

      <View style={styles.form}>
        <TextInput 
          placeholder="Car Make (e.g. Toyota)" 
          style={styles.input} 
          value={vehicle.make} 
          onChangeText={(text) => setVehicle({...vehicle, make: text})}
        />
        <TextInput 
          placeholder="Car Model (e.g. Corolla)" 
          style={styles.input} 
          value={vehicle.model} 
          onChangeText={(text) => setVehicle({...vehicle, model: text})}
        />
        <TextInput 
          placeholder="Year" 
          keyboardType="numeric"
          style={styles.input} 
          value={vehicle.year} 
          onChangeText={(text) => setVehicle({...vehicle, year: text})}
        />
        <TextInput 
          placeholder="Plate Number" 
          style={styles.input} 
          value={vehicle.plateNumber} 
          onChangeText={(text) => setVehicle({...vehicle, plateNumber: text})}
        />
        <TextInput 
          placeholder="Color" 
          style={styles.input} 
          value={vehicle.color} 
          onChangeText={(text) => setVehicle({...vehicle, color: text})}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register Vehicle</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0056b3',
    marginTop: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  form: {
    gap: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#0056b3',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
