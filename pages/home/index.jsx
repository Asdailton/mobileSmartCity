import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styles from "./styles";
import imageBanner from "../../assets/banner.png";

export default function Home() {
  const [user, setUser] = useState('');
  const [temperature, setTemperature] = useState(null);

  const pegarUsername = async () => {
    try {
      const userSalvo = await AsyncStorage.getItem('username');
      setUser(userSalvo);
    } catch (error) {
      console.error('Erro ao recuperar o nome de usuário:', error);
    }
  };

  const fetchTemperature = async () => {
    try {
      const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
        params: {
          latitude: -22.9056,
          longitude: -47.0608,
          current_weather: true
        }
      });
      setTemperature(response.data.current_weather.temperature);
    } catch (error) {
      console.error('Erro ao buscar a temperatura:', error);
    }
  };

  const calculateFeelsLike = (temp) => {
    if (temp < 10) {
      return 'Frio';
    } else if (temp < 20) {
      return 'Agradável';
    } else if (temp < 30) {
      return 'Quente';
    } else {
      return 'Muito Quente';
    }
  };

  useEffect(() => {
    pegarUsername();
    fetchTemperature();
  }, []);

  return (
    <View style={styles.conteiner}>
      <View style={styles.titleConteiner}>
        <Text style={styles.title}>Bem vindo, </Text>
        <Text style={[styles.title, { color: 'white' }]}>{user}</Text>
      </View>
      <View style={styles.temperaturaConteiner}>
        <Text style={styles.titleTemperatura}>
          Temperatura Atual
        </Text>
        <Text style={[styles.temperaturaDescription, { color: 'white' }]}>
          {temperature !== null ? `${temperature} graus` : 'Carregando...'}
        </Text>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: 'bold' }}>Sensação:</Text> 
          <Text style={{ color: 'white' }}>{temperature !== null ? calculateFeelsLike(temperature) : 'Carregando...'}</Text>
        </Text>
        <Text style={{ color: 'white', fontSize: 15 }}>
          <Text style={{ fontWeight: 'bold' }}>Local:</Text> 
          <Text style={{ color: 'white' }}>Senai Roberto Mange</Text>
        </Text>
      </View>
      <Image style={styles.banner} source={imageBanner} />
      <View style={styles.historyConteiner}>
        <Text style={styles.titleHistory}>
          Smart City Senai "Roberto Mange"
        </Text>
        <Text  style={styles.textHistory}>
        O projeto SmartCity tem como objetivo promover soluções
         com dados de sensores em tempo real. Com isso colabora
          para o desenvolvimento de uma cidade inteligente.
        </Text>
      </View>
    </View>
  );
}
