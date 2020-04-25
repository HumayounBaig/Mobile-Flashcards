import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {styles} from '../styles/styles';
export default function AddDecks() {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <KeyboardAvoidingView>
                    <Text style={styles.heading}>What is the title of your new deck?</Text>
                    <TextInput style={styles.input} placeholder="Deck Title" />
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>Create Deck</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </View>
    );
}


