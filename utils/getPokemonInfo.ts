import { pokeApi } from "@/api";
import { Pokemon } from "../interfaces/pokemon-full";

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(
      `/pokemon/${nameOrId.toLowerCase()}`
    );

    const { sprites, name, id, abilities, stats } = data;

    return {
      id,
      sprites,
      name,
      abilities,
      stats,
    };
  } catch (err) {
    return null;
  }
};
