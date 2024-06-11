import { View, Text } from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home(){
    const[user, setUser] = useState('')
    const pegarUsername = async () => {
        try {
          const userSalvo = await AsyncStorage.getItem('username');
          setUser(userSalvo);
        } catch (error) {
          console.error('Erro ao recuperar o nome de usuário:', error);
        }
      };
    useEffect(() => {
        pegarUsername();
      }, []);
            
   


    return(
        <View style={styles.conteiner}>
            <View style={styles.titleConteiner}>
                <Text style={styles.title}>Bem vindo, </Text>
                <Text style={[styles.title, { color: 'white' }]}>{user}</Text>
            </View>
            <View style={styles.temperaturaConteiner}>
                <Text style={styles.titleTemperatura}>
                    Temperatura Atual
                </Text>
                <Text>
                   23 graus
                </Text>
                <Text>
                    Sensação: Agradavel
                </Text>
                
            </View>
        </View>
    )
}