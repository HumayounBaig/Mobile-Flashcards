import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
import {styles} from '../styles/styles';

export default function DeckDetails({route}) {
    console.log(route)
   const {deck} = route.params

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={{alignItems: 'center'}}>
                    <Text style={styles.heading}>{deck.title}</Text>
                    <Text>{deck.count}</Text>
                </View>
                <TouchableOpacity style={[styles.button, {backgroundColor: "#007aff", width: 250}]}>
                    <Text style={styles.text}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {backgroundColor: "#8bc34a", width: 250}]}>
                    <Text style={styles.text}>Start Quiz</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </View>
    );
}


