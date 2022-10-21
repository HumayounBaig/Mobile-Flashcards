import { StyleSheet, Dimensions } from 'react-native';

export const colors = {
    green: '#c3c3c3',
    blue: '#007aff',
    disabled: '#dedede',
    red: 'red',
    black: '#000'

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
        borderRadius: 10,
        paddingLeft: 10
    },
    heading: {
        fontSize: 19,
        fontWeight: "bold",
        color: '#444'
    },
    button: { 
        padding: 11,
        alignItems: 'center',
        alignSelf: 'center', 
        borderRadius: 5,
        width: 250
    },
    quizButton: { 
        padding: 10,
        alignItems: 'center',
        alignSelf: 'center', 
        width: 150,
        marginTop: 10,
        borderRadius: 20
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
    },
    viewPager: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: "50%"
    },
    page: {
      alignItems: 'center',
      justifyContent: 'center'  
    },

    questionCard: {
        borderWidth: 1,
        borderColor: '#ccc',
        width: 300,
        alignItems: 'center',
        backgroundColor: '#eef', 
        height: 200,
        padding: 10,
    },
    question: {
        fontSize: 18,
        marginTop: 40
    },
    buttonView: {
        flexDirection: 'column', 
        marginTop: 40, 
    }
    
});