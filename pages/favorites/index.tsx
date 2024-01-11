import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import Layout from "@/components/layout";
import { deleteFromFavorites, getFavorites } from "@/utils";
import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";
import Favorites from "@/components/favorites/Favorites";
import EmptyFavorites from "@/components/favorites/EmptyFavorites";

const FavoritesPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [changePokemons, setChangePokemons] = useState(false);

  const favoritePokemons = useMemo(() => {
    return getFavorites();
  }, [changePokemons]);

  const handleDeletePokemon = async (pokeId: number) => {
    await deleteFromFavorites(pokeId);

    const updatedFavorites = getFavorites();

    const updatedPokemons = await Promise.all(
      updatedFavorites.map(async (pokeId: string) => {
        const { data } = await pokeApi.get<Pokemon>(`pokemon/${pokeId}`);
        return data;
      })
    );
    setPokemons(updatedPokemons);

    setChangePokemons(!changePokemons);
  };

  useLayoutEffect(() => {
    const fetchFavorites = async () => {
      const favorites = getFavorites();
      const fetchedPokemons = await Promise.all(
        favorites.map(async (pokeId: string) => {
          const { data } = await pokeApi.get<Pokemon>(`pokemon/${pokeId}`);
          return data;
        })
      );

      setPokemons(fetchedPokemons);
    };

    if (typeof window !== "undefined") {
      fetchFavorites();
    }
  }, [favoritePokemons, changePokemons]);

  return (
    <Layout>
      {pokemons.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <Favorites
          pokemons={pokemons}
          handleDeletePokemon={handleDeletePokemon}
        />
      )}
    </Layout>
  );
};

export default FavoritesPage;
