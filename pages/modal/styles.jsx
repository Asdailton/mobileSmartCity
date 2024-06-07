
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#333', // Cor de fundo preta
      },
      title: {
        marginTop: 50,
        fontSize: 30,
        color: '#fff', // Cor do texto branca
        marginBottom: 10,
      },
      lista: {
        marginTop: 40,
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
        color: '#84E4C7', // Cor do texto branca
      },
      sensorValue: {
        fontSize: 14,
        color: '#aaa', // Cor do texto cinza
      },
    });
  
  export default styles;
  