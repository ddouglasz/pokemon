import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllPokemonCharacters } from "./api/actions";
import {
  CharacterTypes,
  ResultsTypes,
  CharacterSummaryTypes,
} from "../types/characters";

const PokemonCharacters: any = () => {
  const [characters, setCharacters] = useState<CharacterSummaryTypes[]>([]);
  const [error, setError] = useState(null);
  const [next, setNext] = useState("");
  const [previous, setPrevious] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemonData = await getAllPokemonCharacters(16);
        const { characterSummary, next, previous } = pokemonData;

        setNext(next);
        setPrevious(previous);
        setCharacters(characterSummary);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, []);

    if (error) return console.error(error);

    if (characters.length === 0) return "loading...";


  return (
    <div className={styles.container}>
      <ul>
        {characters &&
          characters.map((character: CharacterSummaryTypes, i: number) => (
            <li key={i}>
              <p>{character.name}</p>
              <Image
                alt={character.name}
                src={character.pokemon_image}
                width={70}
                height={70}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PokemonCharacters;
