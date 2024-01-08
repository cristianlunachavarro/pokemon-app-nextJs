import React, { FC, useState } from "react";

import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import { Button, Card, Container, Grid, Text, Image } from "@nextui-org/react";

import conffeti from "canvas-confetti";
import { Pokemon } from "@/interfaces";
import { getPokemonInfo, pokemonIsInFavorites, toggleFavorites } from "@/utils";

import Layout from "@/components/layout";

interface props {
  pokemon: Pokemon;
}

const PokemonPage: FC<props> = ({ pokemon }) => {
  console.log("Pokemon -->", pokemon);
  const { name, sprites, id } = pokemon;
  const { other } = sprites;
  const [isInFavorites, setIsInFavorites] = useState(
    pokemonIsInFavorites(Number(id))
  );

  const handleToggleFavorites = () => {
    toggleFavorites(Number(id));
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
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={0}>
                <Image
                  src={sprites.front_default}
                  alt={name}
                  width={150}
                  height={150}
                />
                <Image
                  src={sprites.back_default}
                  alt={name}
                  width={150}
                  height={150}
                />
                <Image
                  src={sprites.front_shiny}
                  alt={name}
                  width={150}
                  height={150}
                />
                <Image
                  src={sprites.back_shiny}
                  alt={name}
                  width={150}
                  height={150}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const pokemonsPaths = [...Array(150)].map((value, index) => `${index + 1}`);
  return {
    paths: pokemonsPaths.map((id) => ({
      params: { id },
    })),
    // fallback: false,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  try {
    const pokemon = await getPokemonInfo(id);

    if (!pokemon) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      } as GetStaticPropsResult<{ [key: string]: any }>;
    }

    return {
      props: {
        pokemon,
      },
      revalidate: 86400,
    } as GetStaticPropsResult<{ [key: string]: any }>;
  } catch (error) {
    console.log("Error fetching a pokemon");
    
    return {
      notFound: true,
    } as GetStaticPropsResult<{ [key: string]: any }>;
  }
};

export default PokemonPage;
