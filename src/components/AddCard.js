import React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {styles} from '../styles/styles';

export default function AddCard() {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <KeyboardAvoidingView>
                    <Text style={[styles.heading, {marginBottom: 40}]}>What is the title of your new deck?</Text>
                    <TextInput style={styles.input} placeholder="Deck Title" />
                    <TouchableOpacity style={[styles.button, {backgroundColor: '#8bc34a', marginTop: 40}]}>
                        <Text style={styles.text}>Create Deck</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>

            </SafeAreaView>
        </View>
    );
}


