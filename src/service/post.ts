import { Effect, pipe } from "effect";
import * as S from "@effect/schema/Schema";
import { useQuery } from "@tanstack/react-query";

const pokemonSchema = S.struct({
  name: S.string,
});

const pokemonPaginationSchema = S.struct({
  count: S.number,
  next: S.nullable(S.string),
  previous: S.nullable(S.string),
  results: S.array(pokemonSchema),
});

const fetchPokemon = (id: string) => {
  return pipe(
    Effect.tryPromise({
      try: () =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        ),
      catch: (e: unknown) =>
        new Error(`Failed to fetch pokemon ${id} from pokeapi.co ${e}`),
    }),
    Effect.flatMap((x) => S.decode(pokemonSchema)(x))
  );
};

const fetchPokemons = () => {
  return pipe(
    Effect.tryPromise({
      try: () =>
        fetch(`https://pokeapi.co/api/v2/pokemon`).then((res) => res.json()),
      catch: (e: unknown) =>
        new Error(`Failed to fetch pokemons from pokeapi.co ${e}`),
    }),
    Effect.flatMap((x) => S.decode(pokemonPaginationSchema)(x))
  );
};

export const usePokemonQuery = (id: string) => {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => Effect.runPromise(fetchPokemon(id)),
  });
};

export const usePokemonsQuery = () => {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: () => Effect.runPromise(fetchPokemons()),
  });
};
