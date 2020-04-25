import React from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import {styles, colors} from '../styles/styles';

export default function AddCard() {
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <KeyboardAvoidingView behavior="padding">
                    <View style={{height: "100%", justifyContent: 'center'}}>
                        <Text style={[styles.heading, {marginBottom: 40}]}>Please enter following to add new card</Text>
                        <TextInput style={styles.input} placeholder="Enter Question" />
                        <TextInput style={styles.input} placeholder="Enter Answer" />
                    
                        <TouchableOpacity style={[styles.button, {backgroundColor: colors.blue, marginTop: 40}]}>
                            <Text style={styles.text}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    
                </KeyboardAvoidingView>

            </SafeAreaView>
        </View>
    );
}


