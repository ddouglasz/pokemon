import styles from "../styles/Home.module.css";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { getAllPokemonCharacters } from "./api/actions";
import {
  CharacterTypes,
  ResultsTypes,
  CharacterSummaryTypes,
} from "../types/characters";
import { Modal } from "../component/Modal";

const PokemonCharacters: any = () => {
  const [characters, setCharacters] = useState<CharacterSummaryTypes[]>([]);
  const [error, setError] = useState<null | any>(null);
  const [next, setNext] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(true);

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

  const onclose = () => {
    setShowModal(false);
  };

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

        <Modal
          title="this is a js object"
          onClose={onclose}
          open={showModal}
        >
          <p>Hello</p>
        </Modal>
    </div>
  );
};

export default PokemonCharacters;
