const toggleFavorites = (id: number) => {
  const { localStorage } = window;

  let favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );

  if (favorites.includes(id)) {
    favorites = favorites.filter((pokeId) => pokeId !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

const pokemonIsInFavorites = (id: number): boolean => {
  if (typeof window === "undefined") return false;

  const { localStorage } = window;

  const favorites: number[] = JSON.parse(
    localStorage.getItem("favorites") || "[]"
  );
  return favorites.includes(id);
};

const getFavorites = () => {
  if (typeof window === "undefined") return false;

  const { localStorage } = window;

  return JSON.parse(localStorage.getItem("favorites") || "[]");
};

export { toggleFavorites, getFavorites, pokemonIsInFavorites };
