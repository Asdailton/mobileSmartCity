import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';

const Map = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [nearestSensor, setNearestSensor] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        if (storedToken) {
          fetchSensors(storedToken);
        }
      } catch (error) {
        console.error("Erro ao buscar token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const updateLocation = async () => {
        const newLocation = await Location.getCurrentPositionAsync({});
        setLocation(newLocation.coords);
      };

      updateLocation(); // Update location immediately

      // Set interval to update location every 2 seconds
      const intervalId = setInterval(updateLocation, 2000);

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    };

    getLocation();
  }, []);

  const fetchSensors = async (token) => {
    const sensorIds = [1, 3, 5, 13];
    const sensorsData = [];

    try {
      for (const id of sensorIds) {
        const sensorData = await fetchSensorById(id, token);
        if (sensorData) {
          sensorsData.push(sensorData);
        }
      }

      setSensors(sensorsData);
    } catch (error) {
      console.error("Erro ao buscar sensores:", error);
    }
  };

  const fetchSensorById = async (id, token) => {
    try {
      const response = await axios.get(
        `http://adamFilho.pythonanywhere.com/api/sensores/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar sensor ${id}:`, error);
      return null;
    }
  };

  const calculateDistance = (point1, point2) => {
    if (!point1 || !point2) return 0;

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

  useEffect(() => {
    if (location && sensors.length > 0) {
      updateNearestSensor(location);
    }
  }, [location, sensors]);

  const updateNearestSensor = (currentLocation) => {
    const distances = sensors.map(sensor => ({
      ...sensor,
      distance: calculateDistance(currentLocation, sensor),
    }));
    const nearest = distances.reduce((prev, curr) => (prev?.distance < curr.distance ? prev : curr), null);
    setNearestSensor(nearest);
  };

  const openDetailsModal = (sensor) => {
    setSelectedSensor(sensor);
    setModalVisible(true);
  };

  const closeDetailsModal = () => {
    setModalVisible(false);
    setSelectedSensor(null);
  };

  return (
    <SafeAreaView style={styles.container}>
       <Text style={styles.title}>Mapa <Text style={{ color: '#84E4C7' }}>dos Sensores</Text></Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location ? location.latitude : -22.914124,
          longitude: location ? location.longitude : -47.068311,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {sensors.map(sensor => (
          <Marker 
            key={sensor.id} 
            coordinate={{ latitude: sensor.latitude, longitude: sensor.longitude }}
            onPress={() => openDetailsModal(sensor)}
          >
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
          {nearestSensor ? (
            <>
              <Text style={{ color: '#84E4C7' }}>Sensor mais próximo: </Text>
              {nearestSensor.localizacao}
            </>
          ) : (
            'Calculando...'
          )}
        </Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeDetailsModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectedSensor && (
              <>
                <Text style={styles.modalText}>
                  Detalhes do Sensor:
                </Text>
                <Text style={styles.sensorType}>Tipo: {selectedSensor.tipo}</Text>
                <Text style={styles.sensorDistance}>Coordenadas: {selectedSensor.latitude}, {selectedSensor.longitude}</Text>
                <Text style={styles.sensorDistance}>Localização: {selectedSensor.localizacao}</Text>
                <Text style={styles.sensorDistance}>Distância: {calculateDistance(location, selectedSensor).toFixed(2)} metros</Text>
              </>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={closeDetailsModal}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
    </SafeAreaView>
  );
};
export default Map;
