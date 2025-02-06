import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <MaterialIcons name="menu-book" style={styles.icon} /> 
        <Text style={styles.link}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
        <MaterialIcons name="favorite" style={styles.icon} /> 
        <Text style={styles.link}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#F27548', // Orange background
    height: 70,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    paddingLeft: 20,
  },
  icon: {
    fontSize: 32, // Icon size
    color: 'white', // Icon color
    alignItems: 'center'
  },
  link: {
    fontSize: 12, // Text size
    alignItems: 'center',
    color: 'white', // Text color
    marginTop: 4, // Space between icon and text
  },
});

export default Navbar;



