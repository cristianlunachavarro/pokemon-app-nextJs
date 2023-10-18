import React, { useLayoutEffect, useMemo, useState } from "react";

import Layout from "@/components/layout";

import { getFavorites } from "@/utils";
import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";

import Favorites from "@/components/favorites/Favorites";
import EmptyFavorites from "@/components/favorites/EmptyFavorites";

const FavoritesPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  const favoritePokemons = useMemo(() => {
    getFavorites();
  }, []);

  useLayoutEffect(() => {
    getFavorites().forEach(async (pokeId: string) => {
      const { data } = await pokeApi.get<Pokemon>(`pokemon/${pokeId}`);
      setPokemons((prevState) => [...prevState, data]);
    });
  }, [favoritePokemons]);

  return (
    <Layout>
      {pokemons.length === 0 ? (
        <EmptyFavorites />
      ) : (
        <Favorites pokemons={pokemons} />
      )}
    </Layout>
  );
};

export default FavoritesPage;
