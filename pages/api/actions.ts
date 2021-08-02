// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Axios } from "../../utils/axiosConfig";
import { pages } from '../../constants'
import { ResultsTypes } from '../../types/characters'

export const getAllPokemonCharacters = async (offset: number) => {
  try {
    const characters = await Axios.get(`pokemon?limit=${pages.PAGE_LIMIT}&offset=${offset}`);
    const { results, count, next, previous } = characters.data

    const characterSummary = await Promise.all(results.map(async (result: ResultsTypes) => {
      return Axios.get(result.url)
        .then((response: any) => {
          return { name: response.data.name, pokemon_image: response.data.sprites.front_default }
        })
        .catch((error) => {
          console.error(error)
        })
    }))

    return { count, next, previous, characterSummary }
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