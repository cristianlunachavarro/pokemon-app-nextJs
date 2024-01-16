import { Container, Image, Text } from "@nextui-org/react";
import React from "react";

const EmptyFavorites = () => {
  return (
    <Container
      css={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 100px)",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",
      }}
    >
      <Text css={{ fontWeight: "bold", fontSize: "20px" }}>
        {" "}
        EMPTY FAVORITES{" "}
      </Text>
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
        alt="poke"
        height={250}
        width={250}
        css={{ opacity: "0.3" }}
      />
    </Container>
  );
};

export default EmptyFavorites;
