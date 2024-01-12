import { pokeApi } from "@/api";
import { Pokemon } from "../interfaces/pokemon-full";

export const getPokemonInfo = async (nameOrId: string) => {
  try {
    const { data } = await pokeApi.get<Pokemon>(
      `/pokemon/${nameOrId.toLowerCase()}`
    );

    const { sprites, name, id, abilities, stats, types } = data;

    return {
      id,
      sprites,
      name,
      abilities,
      stats,
      types
    };
  } catch (err) {
    return null;
  }
};
