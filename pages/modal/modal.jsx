import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from './styles';

const Modal = () => {
  const [sensores, setSensores] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        console.log(token); 

        await fetchSensores(); 
      } catch (error) {
        console.error("Erro ao buscar token:", error);
      }
    };

    fetchToken(); 
  }, [token]); 

  const fetchSensores = async () => {
    try {
      const response = await axios.get(
        'http:/adamFilho.pythonanywhere.com/api/sensores/',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSensores(response.data);
    } catch (error) {
      console.error("Erro ao buscar sensores:", error);
    }
  };

  const renderSensor = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.sensorName}>{item.id}</Text>
      <Text style={styles.sensorName}>{item.tipo}</Text>
      <Text style={[styles.sensorValue, { color: '#fff' }]}>{item.responsavel}</Text>
      <Text style={styles.sensorValue}>{item.localizacao}</Text>
      <Text style={styles.sensorValue}>{item.status_operacional}</Text>
    </View>

  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de  <Text style={{ color: '#84E4C7' }}>Sensores</Text></Text>
      <FlatList
        style={styles.lista}
        data={sensores}
        renderItem={renderSensor}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default Modal;
