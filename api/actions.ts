import axios from "axios";
import { pages, urls } from '../constants'
import { ResultsTypes } from '../types/characters'

const Axios = axios.create({
  baseURL: urls.BASE_URL,
});

export const getAllPokemonCharacters = async (offset: number) => {
  try {
    const characters = await Axios.get(`pokemon?limit=${pages.PAGE_LIMIT}&offset=${offset}`);
    const { results, count } = characters.data

    const characterSummary = await Promise.all(results.map(async (result: ResultsTypes) => {
      const response = await Axios.get(result.url)
      return { name: response.data.name, pokemon_image: response.data.sprites.front_default }
    }))

    return { count, characterSummary }
  } catch (error) {
    return error;
  }
};

export const getCharacterDetails = async (name: string) => {
  try {
    const characterDetails = await Axios.get(`pokemon/${name}`);
    return characterDetails.data
  } catch (error) {
    return error;
  }
};

export const getSearchResults = async (names: string[]) => {
  try {
    const searchResult = await Promise.all(names.map(async (name: string) => {
      const response: any = await Axios.get(`pokemon/${name.toLocaleLowerCase()}`)
      return { name: response.data.name, pokemon_image: response.data.sprites.front_default }
    }))

    return { count: names.length, characterSummary: searchResult }
  } catch (error) {
    return error;
  }
};