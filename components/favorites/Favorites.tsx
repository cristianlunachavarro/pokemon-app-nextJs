import React, { FC } from "react";

import { Pokemon } from "@/interfaces";
import { Card, Grid, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import styles from './Favorites.module.css'

interface typeProps {
  type: {
    name: string;
  };
  slot: number;
}

const Favorites: FC<{ pokemons: Pokemon[]; handleDeletePokemon: (pokeId: number) => void }> = ({ pokemons, handleDeletePokemon }) => {
  const router = useRouter();

  const handleClickedPokemon = (pokemonName: string) => {
    router.push(`/name/${pokemonName}`);
  };

  return (
    <Grid.Container direction="row" gap={2} justify="flex-start">
      {pokemons.length > 0 &&
        pokemons.map((pokemon: Pokemon) => (
          <>
            <Grid
              key={pokemon.id}
              xs={6}
              sm={3}
              md={2}
              xl={1}
            >
              <Card>
                <Card.Image
                  src={pokemon.sprites?.other?.dream_world.front_default}
                  width="100%"
                  height={150}
                  style={{ marginBottom: '5px' }}
                  onClick={() => handleClickedPokemon(pokemon.name)}
                />
                <Text transform="capitalize" h4>
                  {pokemon.name}
                </Text>
                <div className={styles.descriptionContainer}>
                  <div>
                    {pokemon.types && pokemon.types.map((t: typeProps, index: React.Key) => (
                      <Text key={index} transform="capitalize">
                        {t.type.name}
                      </Text>
                    ))}
                  </div>
                  <DeleteOutlinedIcon onClick={() => handleDeletePokemon(pokemon.id)} style={{ cursor: 'pointer' }} />
                </div>
              </Card>
            </Grid>
          </>

        ))}
    </Grid.Container>
  );
};

export default Favorites;
