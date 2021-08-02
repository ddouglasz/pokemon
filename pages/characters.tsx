import styles from "../styles/Home.module.css";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { getAllPokemonCharacters, getCharacterDetails } from "./api/actions";
import {
  CharacterTypes,
  ResultsTypes,
  CharacterSummaryTypes,
} from "../types/characters";
import { Modal } from "../component/Modal";

const PokemonCharacters: any = () => {
  const [characters, setCharacters] = useState<CharacterSummaryTypes[]>([]);
  const [characterDetails, setCharacterDetails] = useState<any>(null);
  const [error, setError] = useState<null | any>(null);
  const [next, setNext] = useState<string>("");
  const [previous, setPrevious] = useState<string>("");
  const [offset, setOffset] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);

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

  const showSharacterDetails = async (characterName: string) => {
    const details = await getCharacterDetails(characterName)
    setCharacterDetails(details)
    setShowModal(true)
  }

  const onclose = () => {
    setShowModal(false);
  };

  console.log('characterDetails>>', characterDetails)

  if (error) return console.error(error);

  if (characters.length === 0) return "loading...";

  return (
    <div className={styles.container}>
      <ul>
        {characters &&
          characters.map((character: CharacterSummaryTypes, i: number) => (
            <li className={styles.character_list} key={i} onClick={() => showSharacterDetails(character.name)} >
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

      {characterDetails &&  <Modal title={characterDetails.species.name} onClose={onclose} open={showModal}>
        <p><span className={styles.bold}>Species:</span>  {characterDetails.species.name}</p>
        <p>
          <ul>
          {characterDetails && characterDetails.stats.map((specieStat: any, i: number) => (
            <p key={i}><span className={styles.bold}>Base Stat: {specieStat.base_stat}</span></p>
            ))}
          </ul>
        </p>
      </Modal>}
    </div>
  );
};

export default PokemonCharacters;
