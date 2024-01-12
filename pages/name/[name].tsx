import React, { FC, useState } from "react";

import { PokemonListResponse, Pokemon, SmallInfoPokemon } from "@/interfaces";
import { GetStaticPaths, GetStaticProps } from "next";
import { pokeApi } from "@/api";

import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";
import Layout from "@/components/layout";

import conffeti from "canvas-confetti";

import { getPokemonInfo, pokemonIsInFavorites, toggleFavorites } from "@/utils";
import { typeColors } from "@/utils/typeColors";

interface props {
  pokemon: Pokemon;
}

interface typeProps {
  type: {
    name: string;
  };
  slot: number;
}

interface statsProps {
  stat: {
    name: string;
  };
  base_stat: number;
}

const gridItemStyle = {
  border: "1px solid white",
  borderRadius: "20px",
  padding: "0 2% 0 2%",
  marginRight: "1%",
};

const textStyle = {
  marginRight: "5%",
  padding: "0 0",
  fontWeight: "bold",
};

const PokemonByNamePage: FC<props> = ({ pokemon }) => {
  const { name, sprites, id, types, stats } = pokemon;
  
  const { other } = sprites;

  const [isInFavorites, setIsInFavorites] = useState(pokemonIsInFavorites(id));

  const handleToggleFavorites = () => {
    toggleFavorites(id);
    setIsInFavorites(!isInFavorites);

    if (isInFavorites) return;

    conffeti({
      zIndex: 999,
      particleCount: 200,
      spread: 200,
      angle: -70,
      origin: {
        x: 0.95,
        y: 0,
      },
    });
  };

  return (
    <Layout title={name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={other?.dream_world.front_default || "/no-image.png"}
                alt={name}
                width="100%"
                height={200}
              />
            </Card.Body>
            <Container
              direction="row"
              display="flex"
              gap={0}
              style={{ marginTop: "5%" }}
            >
              <Image
                src={sprites.front_default}
                alt={name}
                width={50}
                height={50}
              />
              <Image
                src={sprites.back_default}
                alt={name}
                width={50}
                height={50}
              />
              <Image
                src={sprites.front_shiny}
                alt={name}
                width={50}
                height={50}
              />
              <Image
                src={sprites.back_shiny}
                alt={name}
                width={50}
                height={50}
              />
            </Container>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: "flex", justifyContent: "space-between" }}
            >
              <Text h1 transform="capitalize">
                {name}
              </Text>

              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={handleToggleFavorites}
              >
                {isInFavorites ? "Remove from favorites" : "Save to favorites"}
              </Button>
            </Card.Header>

            <Card.Body>
              <Text size={30} css={{ marginBottom: "2%" }}>
                Types
              </Text>
              <Container direction="column" display="flex" gap={0}>
                <div style={{ width: "30%" }}>
                  {types &&
                    types.map((t: typeProps, index: React.Key) => (
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
              </Container>
              <Text size={30} css={{ marginBottom: "2%" }}>
                Habilities
              </Text>
              <Grid.Container display="flex" align="center" gap={2}>
                {stats.map((stat: statsProps, index: React.Key) => (
                  <Grid
                    key={index}
                    xs={12}
                    sm={4}
                    md={4}
                    lg={3}
                    xl={3}
                    css={gridItemStyle}
                  >
                    <Text
                      size={15}
                      transform="uppercase"
                      css={textStyle}
                      color="secondary"
                    >
                      {`${stat.stat.name}: `}
                    </Text>
                    <Text size={15} css={textStyle}>
                      {stat.base_stat}
                    </Text>
                  </Grid>
                ))}
              </Grid.Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");
  const pokemonsName: string[] = data.results.map((poke) => poke.name);

  return {
    paths: pokemonsName.map((name) => ({
      params: { name },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  const pokemon = await getPokemonInfo(name);

  if (!pokemon) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      pokemon,
    },
    // 24 hours will re-generate
    revalidate: 86400,
  };
};

export default PokemonByNamePage;
