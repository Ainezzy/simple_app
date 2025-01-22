import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Home Screen</Text>
      <Navbar /> {/* Keep the navbar fixed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60, // Add padding to avoid overlapping with the navbar
  },
  text: {
    fontSize: 24,
  },
});

export default Home;
