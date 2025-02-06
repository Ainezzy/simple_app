import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView,  Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for Back Button
import { FavoritesContext } from '../FavoritesContext';

import axios from 'axios';

const SPOONACULAR_API_KEY = 'cff58d2a963c4bde8612e865bee280e5'; // Use your actual API key

const Recipe = ({ route, navigation }) => {
  const { recipe } = route.params; // Get the recipe object passed from Home
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToFavorites, removeFromFavorites, isFavorite } = useContext(FavoritesContext);
  const isRecipeFavorite = isFavorite(recipe.id); // Check if the recipe is a favorite

  // Function to fetch recipe details
  const fetchRecipeDetails = async () => {
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${recipe.id}/information`, // API endpoint
        {
          params: { apiKey: SPOONACULAR_API_KEY }, // Pass your API key
        }
      );
      setRecipeDetails(response.data); // Save recipe details
    } catch (error) {
      console.error('Error fetching recipe details:', error);
      alert('Failed to load recipe details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch recipe details when the screen loads
  useEffect(() => {
    fetchRecipeDetails();
  }, []);

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6347" />
      </View>
    );
  }

  // Show error if no recipe details are available
  if (!recipeDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load recipe details.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      {/* Favorite Icon */}
      <TouchableOpacity
        style={styles.favoriteIcon}
        onPress={() => {
          const favoriteRecipe = {
            id: recipe.id,
            title: recipeDetails.title,
            image: recipeDetails.image,
          };
          isRecipeFavorite ? removeFromFavorites(recipe.id) : addToFavorites(favoriteRecipe);
        }}
      >
        <Ionicons name={isRecipeFavorite ? 'heart' : 'heart-outline'} size={24} color="white" />
      </TouchableOpacity>

      {/* Recipe Image */}
      <Image source={{ uri: recipeDetails.image }} style={styles.image} />

      {/* Scrollable Content */}
      <ScrollView style={styles.contentContainer}>
        {/* Title and Tags */}
        <View style={styles.titleRow}>
          <Text style={styles.title}>{recipeDetails.title}</Text>
        </View>

        {/* Servings and Time Tags */}
        <View style={styles.tagContainer}>
          <View style={styles.tag}>
            <Ionicons name="people" size={16} color="#F27548" />
            <Text style={styles.tagText}>{recipeDetails.servings || 'N/A'} Servings</Text>
          </View>
          <View style={styles.tag}>
            <Ionicons name="time" size={16} color="#F27548" />
            <Text style={styles.tagText}>
              {recipeDetails.readyInMinutes || 'N/A'} Mins
            </Text>
          </View>
        </View>

        {/* Ingredients */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        {recipeDetails.extendedIngredients.map((ingredient) => (
          <View key={ingredient.id} style={styles.listItem}>
            <View style={styles.bullet} />
            <Text style={styles.listItemText}>{ingredient.original}</Text>
          </View>
        ))}

        {/* Directions */}
        <Text style={styles.sectionTitle}>Directions</Text>
        {recipeDetails.instructions ? (
          recipeDetails.instructions
            .split('.')
            .filter((instruction) => instruction.trim() !== '')
            .map((instruction, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.bullet} />
                <Text style={styles.listItemText}>{instruction.trim()}.</Text>
              </View>
            ))
        ) : (
          <Text style={styles.listItemText}>No instructions available.</Text>
        )}
      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 10,
    backgroundColor: '#F27548',
    borderRadius: 20,
    padding: 8,
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginTop: 20
  },
  favoriteIcon: {
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 10,
    backgroundColor: '#F27548',
    borderRadius: 20,
    padding: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginTop: 20
  },
  image: {
    width: '100%',
    height: 250,
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    marginTop: -20, 
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F27548', 
  },
  tagContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDECE4',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  tagText: {
    fontSize: 14,
    color: '#F27548',
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 10,
    marginTop: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F27548',
    marginRight: 10,
    marginTop: 6,
  },
  listItemText: {
    fontSize: 16,
    color: '#1E1E1E',
    lineHeight: 24,
  },
});

export default Recipe;

