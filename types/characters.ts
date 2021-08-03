export type ResultsTypes = {
    name: string
    url: string
  }
  
  export type CharacterTypes = {
    count: number
    next: string
    previous: string
    results: ResultsTypes[]
  }

  export type CharacterSummaryTypes = {
      name: string
      pokemon_image: string
    }