import { pokeApi } from "@/api";
import { GetStaticProps, NextPage } from "next";
import { PokemonListResponse, SmallInfoPokemon } from "@/interfaces";

import Pokemons from "../components/pokemons";

import Layout from "@/components/layout";

interface props {
  pokemons: SmallInfoPokemon[];
}

const HomePage: NextPage<props> = (props) => {
  const { pokemons } = props;
  return (
    <Layout>
      <Pokemons pokemons={pokemons} />
    </Layout>
  );
};

export default HomePage;

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=150");
  const pokemons = data.results.map((p, i) => ({
    ...p,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1
      }.svg`,
  }));
  return { props: { pokemons: pokemons } };
};
