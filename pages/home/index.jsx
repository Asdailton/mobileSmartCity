import { View, Text, Image } from "react-native";
import styles from "./styles";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import imageBanner from "../../assets/banner.png"

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
                <Text style={[styles.temperaturaDescription, { color: 'white' }]}>
                    23 graus
                </Text>
                <Text style={{ color: 'white' }}>
                    <Text style={{ fontWeight: 'bold' }}>Sensação:</Text> 
                    <Text style={{ color: 'white' }}>Agradável</Text>
                </Text>
                <Text style={{ color: 'white', fontSize: 15 }}>
                    <Text style={{ fontWeight: 'bold' }}>Local:</Text> 
                    <Text style={{ color: 'white' }}>Senai Roberto Mange</Text>
                </Text>
               
            </View>
            <Image style={styles.banner} source={imageBanner}/>
            <View>
              <Text style={styles.titleHistory}>
                Smart City Senai "Roberto Mange"
              </Text>
            </View>

        </View>
    )
}