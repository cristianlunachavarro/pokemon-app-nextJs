import React, { FC } from "react";

import { Pokemon } from "@/interfaces";
import { Card, Grid, Text } from "@nextui-org/react";
import { useRouter } from "next/router";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import styles from "./Favorites.module.css";

interface typeProps {
  type: {
    name: string;
  };
  slot: number;
}

const typeColors: { [key: string]: string } = {
  poison: "#d238f5",
  water: "#68c8f7",
  ice: "#9dfcf3",
  fire: "#e3822d",
  bug: "#4f2c28",
  flying: "#5c70ab",
  fighting: "#5c523e",
  ground: "#3e401b",
  normal: "#a47dad",
  grass: "#1df548",
  dragon: "#dfe378",
  fairy: "#f2b6eb",
};

const Favorites: FC<{
  pokemons: Pokemon[];
  handleDeletePokemon: (pokeId: number) => void;
}> = ({ pokemons, handleDeletePokemon }) => {
  const router = useRouter();

  const handleClickedPokemon = (pokemonName: string) => {
    router.push(`/name/${pokemonName}`);
  };

  return (
    <Grid.Container direction="row" gap={2} justify="flex-start">
      {pokemons.length > 0 &&
        pokemons.map((pokemon: Pokemon) => (
          <>
            <Grid key={pokemon.id} xs={6} sm={3} md={2} xl={1}>
              <Card>
                <Card.Image
                  src={pokemon.sprites?.other?.dream_world.front_default}
                  width="100%"
                  height={150}
                  style={{ marginBottom: "5px", cursor: "pointer" }}
                  onClick={() => handleClickedPokemon(pokemon.name)}
                />
                <Text transform="capitalize" h4>
                  {pokemon.name}
                </Text>
                <div className={styles.descriptionContainer}>
                  <div className={styles.types}>
                    {pokemon.types &&
                      pokemon.types.map((t: typeProps, index: React.Key) => (
                        <div
                          key={index}
                          style={{
                            backgroundColor: typeColors[t.type.name],
                            padding: "0% 4%",
                            borderRadius: "20px",
                            width: "100%",
                            textAlign: "center",
                            marginBottom: "3%",
                          }}
                        >
                          <Text transform="capitalize">{t.type.name}</Text>
                        </div>
                      ))}
                  </div>
                  <DeleteOutlinedIcon
                    onClick={() => handleDeletePokemon(pokemon.id)}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </Card>
            </Grid>
          </>
        ))}
    </Grid.Container>
  );
};

export default Favorites;
