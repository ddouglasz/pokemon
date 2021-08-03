import styles from "../styles/Home.module.css";
import ReactPaginate from "react-paginate-next";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  getAllPokemonCharacters,
  getCharacterDetails,
  getSearchResults,
} from "../api/actions";
import { pages } from "../constants";
import {
  CharacterSummaryTypes,
} from "../types/characters";
import { Modal } from "../components/Modal";
import { PokemonList } from "../utils/pokemonList";

const PokemonCharacters: any = () => {
  const [characters, setCharacters] = useState<CharacterSummaryTypes[]>([]);
  const [characterDetails, setCharacterDetails] = useState<any>(null);
  const [error, setError] = useState<null | any>(null);
  const [offset, setOffset] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<CharacterSummaryTypes[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const pokemonData = await getAllPokemonCharacters(offset);
        const { count, characterSummary } = pokemonData;

        setCharacters(characterSummary);
        setCount(count);
      } catch (error) {
        setError(error);
      }
    }

    fetchData();
  }, [offset]);

  const showSharacterDetails = async (characterName: string) => {
    const details = await getCharacterDetails(characterName);
    setCharacterDetails(details);
    setShowModal(true);
  };

  const onclose = () => {
    setShowModal(false);
  };

  //pagination
  const pageCount = Math.ceil(count / pages.PAGE_LIMIT);

  const handlePageClick = async (e: { selected: any }) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pages.PAGE_LIMIT;

    setOffset(offset);

    try {
      const pokemonData = await getAllPokemonCharacters(offset);
      const { count, previous, characterSummary } = pokemonData;

      if (previous === null) return;
      setCharacters(characterSummary);
      setCount(count);
    } catch (error) {
      setError(error);
    }
  };

  //handle search
  const handleChange = async (event: any) => {
    let results: string[] = [];
    setSearchTerm(event.target.value);
    if (event.target.value.length >= 3) {
      results = PokemonList.filter((pokemon) =>
        pokemon.toLowerCase().includes(searchTerm)
      );

      if(results.length === 0) return

      const searchedList = await getSearchResults(results);
      const { count, characterSummary } = searchedList;
      setSearchResult(characterSummary);
    }

    if (event.target.value.length < 3) {
      setSearchResult([]);
    }
  };

  if (error) return console.error(error);

  if (characters.length === 0) return <div className={styles.loading}>Loading...</div>;

  const renderData = (searchResult: CharacterSummaryTypes[], characters: CharacterSummaryTypes[]) => {
    if(searchResult.length === 0) {
      return characters
    } else {
      return searchResult
    }
  }

  const data = renderData(searchResult, characters)

  return (
    <div className={styles.container}>
      <input
        className={styles.search}
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul>
        {data &&
          data.map((character: CharacterSummaryTypes, i: number) => (
            <li
              className={styles.character_list}
              key={i}
              onClick={() => showSharacterDetails(character.name)}
            >
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

      {characterDetails && (
        <Modal title="Pokemon Details" onClose={onclose} open={showModal}>
          <div className={styles.modal_layout}>
            <div className={styles.layout}>
              <p>
                <span className={styles.bold}>Species:</span>{" "}
                {characterDetails.species.name}
              </p>
              <div className={styles.display}>
                <Image
                  alt={characterDetails.species.name}
                  src={characterDetails.sprites.front_default}
                  width={70}
                  height={70}
                />
              </div>
              <div>
                <p>
                  <span className={styles.spacing}>
                    <span className={styles.bold}>Weight: </span>
                    {characterDetails.weight}
                  </span>
                </p>
                <ul>
                  <p className={styles.bold}>Stats: </p>
                  {characterDetails &&
                    characterDetails.stats.map((specieStat: any, i: number) => (
                      <p key={i}>
                        <span className={styles.spacing}>
                          <span className={styles.bold}>Base Stat:</span>{" "}
                          {specieStat.base_stat}
                        </span>
                        <span className={styles.spacing}>
                          <span className={styles.bold}>Effort:</span>{" "}
                          {specieStat.effort}
                        </span>
                        <span className={styles.spacing}>
                          <span className={styles.bold}>Stat name:</span>{" "}
                          {specieStat.stat.name}
                        </span>
                        <br />
                        <span className={styles.spacing}>
                          <span className={styles.bold}>Stat Url:</span>{" "}
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={specieStat.stat.url}
                          >
                            Species stats url(click me)
                          </a>
                        </span>
                      </p>
                    ))}
                </ul>
              </div>
              <div>
                <ul>
                  <p className={styles.bold}>Types: </p>
                  {characterDetails &&
                    characterDetails.types.map(
                      (CharacterTypes: any, i: number) => (
                        <p key={i}>
                          <span className={styles.spacing}>
                            <span className={styles.bold}>Slot:</span>{" "}
                            {CharacterTypes.slot}
                          </span>
                          <span className={styles.spacing}>
                            <span className={styles.bold}>Type:</span>{" "}
                            {CharacterTypes.type.name}
                          </span>
                          <br />
                          <span className={styles.spacing}>
                            <span className={styles.bold}>Type Url:</span>{" "}
                            <a
                              target="_blank"
                              rel="noreferrer"
                              href={CharacterTypes.type.url}
                            >
                              Species type url(click me)
                            </a>
                          </span>
                        </p>
                      )
                    )}
                </ul>
              </div>
            </div>

            <div className={styles.layout}>
              <Image
                alt={characterDetails.species.name}
                src={characterDetails.sprites.front_default}
                width={70}
                height={70}
              />
              <p className={styles.bold}>Moves: </p>
              <div className={styles.modal_scroll_view}>
                <pre>
                  <code>{JSON.stringify(characterDetails.moves, null, 2)}</code>
                </pre>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <div>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default PokemonCharacters;
