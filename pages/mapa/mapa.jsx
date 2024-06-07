import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, Pressable } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import styles from './styles';

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [nearestSensor, setNearestSensor] = useState(null);

  const sensors = [
    { id: 'Sensor 1', latitude: -22.9141396, longitude: -47.0681575 },
    { id: 'Sensor 2', latitude: -22.9141838, longitude: -47.0683573 },
    { id: 'Sensor 3', latitude: -22.9141971, longitude: -47.0683788 },
  ];

  const initialRegion = {
    latitude: -22.914124,
    longitude: -47.068311,
    latitudeDelta: 0.0001,
    longitudeDelta: 0.0001,
  };

  const camera = {
    center: {
      latitude: -22.914124,
      longitude: -47.068311,
    },
    heading: 90,
    altitude: 1000,
    zoom: 19,
    pitch: 25,
  };

  useEffect(() => {
    const requestPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);

      updateNearestSensor(location.coords);

      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setLocation(newLocation.coords);
          updateNearestSensor(newLocation.coords);
        }
      );

      return () => {
        locationSubscription.remove();
      };
    };

    requestPermissions();
  }, []);

  const updateNearestSensor = (currentLocation) => {
    const distances = sensors.map(sensor => ({
      ...sensor,
      distance: calculateDistance(currentLocation, sensor),
    }));
    const nearest = distances.reduce((prev, curr) => (prev.distance < curr.distance ? prev : curr));
    setNearestSensor(nearest);
  };

  const calculateDistance = (point1, point2) => {
    const R = 6371e3; // Radius of the Earth in meters
    const lat1 = point1.latitude * Math.PI / 180;
    const lat2 = point2.latitude * Math.PI / 180;
    const deltaLat = (point2.latitude - point1.latitude) * Math.PI / 180;
    const deltaLon = (point2.longitude - point1.longitude) * Math.PI / 180;

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mapa</Text>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        camera={camera}
        scrollEnabled={true}
        zoomEnabled={true}
        pitchEnabled={true}
        rotateEnabled={true}
      >
        {sensors.map(sensor => (
          <Marker key={sensor.id} coordinate={sensor}>
            <Image style={styles.iconMarker} source={require('../../assets/temperatura.png')} />
          </Marker>
        ))}
        {location && (
          <Marker coordinate={location}>
            <View style={[styles.customMarker, { backgroundColor: 'red' }]} />
          </Marker>
        )}
      </MapView>
      <View style={styles.descricao}>
        <Text style={styles.distanceText}>
          {nearestSensor
            ? `Sensor mais próximo: ${nearestSensor.id}\n` +
              sensors.map(sensor => (
                `Distância para ${sensor.id}: ${calculateDistance(location, sensor).toFixed(2)} metros\n`
              )).join('')
            : 'Calculando...'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Map;
