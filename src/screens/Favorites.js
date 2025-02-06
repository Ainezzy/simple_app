import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { FavoritesContext } from '../FavoritesContext';
import RecipeCard from '../components/RecipeCard';
import Navbar from '../components/Navbar';

const Favorites = ({ navigation }) => {
  const { favorites } = useContext(FavoritesContext);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite recipes yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeCard
              image={item.image}
              title={item.title}
              onPress={() => navigation.navigate('Recipe', { recipe: item })}
            />
          )}
          contentContainerStyle={styles.recipeList}
        />
      )}
      <Navbar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  recipeList: {
    paddingBottom: 60,
  },
});

export default Favorites;
