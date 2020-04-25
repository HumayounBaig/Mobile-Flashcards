import { StyleSheet, Dimensions } from 'react-native';

export const colors = {
    green: '#8bc34a',
    blue: '#007aff',
}
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
        borderColor: "#dedede",
        margin: 5,
        borderRadius: 2
    },
    heading: {
        fontSize: 18,
        fontWeight: "bold",
        color: '#444'
    },
    button: { 
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center', 
        borderRadius: 5,
        width: 250
    },
    deleteButton:{
        position: 'absolute',
        bottom: 0
    },
    text: {
        color: 'white',
    }, 
    mutedText:{
        color: '#777'
    },
    listItem: {
        flex: 1,
        width: Dimensions.get('window').width,
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#dedede'
    }
});