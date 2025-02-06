import React, { createContext, useState } from 'react';

// Create the Context
export const FavoritesContext = createContext();

// Create a Provider component
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Add recipe to favorites
  const addToFavorites = (recipe) => {
    setFavorites((prev) => [...prev, recipe]);
  };

  // Remove recipe from favorites
  const removeFromFavorites = (id) => {
    setFavorites((prev) => prev.filter((recipe) => recipe.id !== id));
  };

  // Check if a recipe is in favorites
  const isFavorite = (id) => favorites.some((recipe) => recipe.id === id);

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
