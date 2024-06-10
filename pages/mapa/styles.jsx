import {StyleSheet} from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'white'
  },
  iconMarker:{
     width:15,
     height:25
  },
  map: {
    width: '100%',
    height: '70%',
    marginBottom: 10,
  },
  customMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'red',
  },
  descricao: {
    alignItems: 'center',
    marginBottom: 10,
    
  },
  distanceText: {
    fontSize: 16,
    color:'white',
  },
  modalView: {
    marginTop: 200,
    justifyContent: 'center',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  sensorDetails: {
    marginBottom: 10
  },
  sensorType: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  sensorDistance: {
    fontSize: 14
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

    export default styles