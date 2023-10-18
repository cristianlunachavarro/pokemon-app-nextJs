import { FavoritePokemonList, Pokemon } from "@/interfaces";
import { Card, Grid, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

import React, { FC } from "react";

interface typeProps {
  type: {
    name: string;
  };
  slot: number;
}

const Favorites: FC<FavoritePokemonList> = ({ pokemons }) => {
  const router = useRouter();

  const handleClickedPokemon = (pokemonName: string) => {
    router.push(`/name/${pokemonName}`);
  };

  return (
    <Grid.Container direction="row" gap={2} justify="flex-start">
      {pokemons.length > 0 &&
        pokemons.map((pokemon: Pokemon) => (
          <Grid
            key={pokemon.id}
            xs={6}
            sm={3}
            md={2}
            xl={1}
            onClick={() => handleClickedPokemon(pokemon.name)}
          >
            <Card>
              <Card.Image
                src={pokemon.sprites.other.dream_world.front_default}
                width="100%"
                height={150}
              />
              <Text transform="capitalize" h4>
                {pokemon.name}
              </Text>
              {pokemon.types.map((t: typeProps, index: React.Key) => (
                <Text key={index} transform="capitalize">
                  {t.type.name}
                </Text>
              ))}
            </Card>
          </Grid>
        ))}
    </Grid.Container>
  );
};

export default Favorites;
