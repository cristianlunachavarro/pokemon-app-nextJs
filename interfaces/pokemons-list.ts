import { Pokemon } from ".";

export interface PokemonListResponse {
  map(arg0: (d: any) => void): unknown;
  count: number;
  next?: string;
  previous?: null;
  results: SmallInfoPokemon[];
}

export interface SmallInfoPokemon {
  name: string;
  url: string;
  id: string;
  img: string;
}

export interface FavoritePokemonList {
  pokemons: Pokemon[];
}
