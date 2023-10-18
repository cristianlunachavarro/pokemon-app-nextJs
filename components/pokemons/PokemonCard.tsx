import React, { FC } from "react";
import { Card, Grid, Row, Text } from "@nextui-org/react";
import { SmallInfoPokemon } from "@/interfaces";
import router from "next/router";

interface props {
  pokemon: SmallInfoPokemon;
}

const PokemonCard: FC<props> = (props) => {
  const { id, name, img } = props.pokemon;

const goToPokemon = () => {
  router.push(`/name/${name}`)
}

  return (
    <Grid key={id} sx={6} sm={3} md={2}>
      <Card hoverable clickable onClick={goToPokemon}>
        <Card.Body>
          <Card.Image src={img} alt={name} width="100%" height={140} />
          <Row justify="space-between">
            <Text transform="capitalize">{name}</Text>
            <Text>#{id} </Text>
          </Row>
        </Card.Body>
      </Card>
    </Grid>
  );
};

export default PokemonCard;
