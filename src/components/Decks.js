import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

export default function Decks() {
  return (
      <View style={styles.container}>
          <SafeAreaView>
              <Text>Decks</Text>

          </SafeAreaView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
