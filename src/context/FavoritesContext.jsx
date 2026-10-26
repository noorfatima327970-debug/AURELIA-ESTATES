import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "aurelia_favorites";

const getSavedFavorites = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(getSavedFavorites);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(favorites)
    );
  }, [favorites]);

  const isFavorite = (id) =>
    favorites.includes(Number(id));

  const toggleFavorite = (id) => {
    const propertyId = Number(id);

    setFavorites((previous) =>
      previous.includes(propertyId)
        ? previous.filter((item) => item !== propertyId)
        : [...previous, propertyId]
    );
  };

  const removeFavorite = (id) => {
    setFavorites((previous) =>
      previous.filter((item) => item !== Number(id))
    );
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteCount: favorites.length,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      "useFavorites must be used inside FavoritesProvider"
    );
  }

  return context;
};