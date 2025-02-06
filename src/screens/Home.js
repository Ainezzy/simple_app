import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Ionicons } from '@expo/vector-icons';

const SPOONACULAR_API_KEY = 'cff58d2a963c4bde8612e865bee280e5'; // Use your actual API key
const API_URL = 'https://api.spoonacular.com/recipes/findByIngredients';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to fetch recipes based on ingredients
  const fetchRecipes = async () => {
    if (!searchQuery.trim()) {
      alert('Please enter ingredients to search for recipes.');
      return;
    }

    setLoading(true);
    try {
      // Fetch recipes based on user input (comma-separated ingredients)
      const response = await axios.get(API_URL, {
        params: {
          ingredients: searchQuery,
          number: 10,
          apiKey: SPOONACULAR_API_KEY,
        },
      });

      const filteredRecipes = response.data.filter((recipe) => {
        // Check if the recipe contains all ingredients
        const ingredients = searchQuery.split(',').map((item) => item.trim().toLowerCase());
        return ingredients.every((ingredient) => recipe.usedIngredients.some((used) => used.name.toLowerCase() === ingredient));
      });

      setRecipes(filteredRecipes); // Update recipes with the filtered ones
    } catch (error) {
      console.error('Error fetching recipes:', error);
      alert('Failed to fetch recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.headerSmall}>Hungry?</Text>
      <Text style={styles.headerLarge}>
        Find <Text style={styles.highlight}>quick recipes</Text> with {'\n'}what you’ve got!
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={28} color="#939393" />
        <TextInput
          style={styles.searchBar}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={fetchRecipes}
        />
      </View>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#FF6347" style={styles.loading} />}

      {/* Recipe List */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <RecipeCard
            image={`https://spoonacular.com/recipeImages/${item.id}-556x370.jpg`}
            title={item.title}
            onPress={() => navigation.navigate('Recipe', { recipe: item })}
          />
        )}
        contentContainerStyle={styles.recipeList}
      />
      {/* Navbar */}
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerSmall: {
    fontSize: 16,
    color: '#939393',
    marginBottom: 4,
    marginTop: 40
  },
  headerLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginBottom: 16,
  },
  highlight: {
    color: '#F27548',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: '#939393',
    outlineStyle: 'none',
  },
  loading: {
    marginTop: 20,
  },
  recipeList: {
    paddingBottom: 80, // Space for Navbar
  },
});

export default Home;
