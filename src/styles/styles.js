import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: "#dedede"
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#444'
    },
    button: { 
        padding: 10,
        alignItems: 'center', 
        borderRadius: 5,
        width: 250
    },
    deleteButton:{
        position: 'absolute',
        bottom: 0
    },
    text: {
        color: 'white'
    }, 
  });