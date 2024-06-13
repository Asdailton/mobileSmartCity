import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    conteiner: {
        backgroundColor: '#202020',
        alignItems: 'center',
        justifyContent: 'flex-start', // Alinha os itens ao topo
        flex: 1,
        paddingTop: 50, // Espaçamento superior para deixar espaço para o título
    },
    titleConteiner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontSize: 35,
        color: '#84E4C7',
        marginBottom: 20, 
        marginTop: 20, 
    },
    temperaturaConteiner: {
        backgroundColor: '#313131',
        padding: 20,
        width: '90%',
        flexDirection: 'column',
        borderRadius: 10,
       
    },
    titleTemperatura: {
        fontSize: 27,
        color: '#84E4C7',
        marginBottom: 10,
    },
    temperaturaDescription: {
        fontSize: 20,
        color: 'white',
        fontWeight: '400',
        marginBottom: 5,
    },
    banner: {
        marginTop: 30,
        width: '100%',
    },
    titleHistory:{
        fontSize: 23,
        color: '#84E4C7',
        marginBottom: 10,
        marginTop: 7
    }

});

export default styles;
