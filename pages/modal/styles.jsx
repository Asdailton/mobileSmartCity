
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333', // Cor de fundo preta
      },
      title: {
        marginTop: 70,
        fontSize: 30,
        color: '#fff', // Cor do texto branca
        marginBottom: 10,
      },
      lista: {
        marginTop: 20,
        width: '80%', // Largura da lista
        height: '80%', // Altura da lista
        backgroundColor: '#333', // Cor de fundo preta
        borderRadius: 10, // Rádio de curvatura
        padding: 10, // Espaçamento interno
      },
      card: {
        backgroundColor: '#444', // Cor de fundo preta escuro
        padding: 10, // Espaçamento interno
        borderRadius: 10, // Rádio de curvatura
        marginBottom: 10, // Espaçamento entre cards
      },
      sensorName: {
        fontSize: 16,
        color: '#84E4C7', 
      },
      sensorValue: {
        fontSize: 14,
        color: 'white', 
      },
    });
  
  export default styles;
  