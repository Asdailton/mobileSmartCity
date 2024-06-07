import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'black',
    },
    map: {    
     width: '100%', // Defina a largura do mapa para ocupar toda a largura do componente pai
      height: '60%', // Defina a altura do mapa para ocupar toda a altura do componente pai

    },
    iconMarker: {
      width: 30,
      height: 30,
      borderRadius: 5,
    },
    customMarker: {
      width: 20,
      height: 20,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    distanceText: {
      color: 'white',
      fontSize: 15,
      
    },
    descricao:{
       marginTop: 40,
       backgroundColor: '#333',
       padding:10,
       borderRadius: 15,
  },
  
  btnModal:{
    marginTop:20,
    borderWidth:1,
    borderRadius:10,
    width:'80%',
    height:50,
    backgroundColor:'#84E4C7',
    alignItems:'center',
    justifyContent:'center',
},
title:{
  color:'white',
  fontSize: 30}
    });

    export default styles