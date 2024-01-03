import { SmallInfoPokemon } from "@/interfaces";
import React, { FC } from "react";

import { Grid } from "@nextui-org/react";
import PokemonCard from "./PokemonCard";


interface props {
  pokemons: SmallInfoPokemon[];
}
const Pokemon: FC<props> = (props) => {
  const { pokemons } = props;

  return (
    <Grid.Container gap={2} justify="flex-center">
      {pokemons.map((pokemon) => {
        return <PokemonCard key={pokemon.id} pokemon={pokemon} />
      })}
    </Grid.Container>
  );
};

export default Pokemon;
