import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const RecipeCard = ({ image, title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Recipe Image */}
      <Image source={{ uri: image }} style={styles.image} />

      {/* Gradient Overlay */}
      <LinearGradient
        colors={['rgba(242, 117, 72, 0.85)', 'rgba(255, 255, 255, 0.5)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        {/* Title */}
        <Text style={styles.title}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 168, // Fixed height
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default RecipeCard;
