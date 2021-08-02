## POKEMON
My thought process for approaching this question started from inspecting the api to be consumed firstly. 
## LIST OF INTERESTING AREAS TO LOOK

*** actions ***
Look into `pages>api>actions.ts`  for the methods that fetch the data for the UI to consume. 
- `getAllPokemonCharacters: ` this was interesting for me to fetch because I had to think of a way to access another set of data from the url that mnny async call would return. I concluded map through my returned data from the first axios call (characterSummary) then use a Promise.all()-based approach to make another call (Promise because I want all the data only when the promise have returned all of them).
I structure them in an object with my pagination data and send to the frontend where it is now available to consume when the page lands.
I chose to send only the attribues of name and image from the promise, since that is basically what we need for the frontend

- `getCharacterDetails: ` this is a straightforward axios call that sends an object to the frontend where I btoke the data into the different fields to be displayed on the frontend. 
When the function is called, I pass a character name along to complete the url for the axios call (`/pokemon/${name}`) and make an axios call. the data is returned to the component.

*** Pages/Components ***

- `Character component: ` this component consumes the data returned from `getAllPokemonCharacters` and uses it to setState for different fields to display the needed data on each Pokemon. 

- `Modal: ` this is a simple reusable component that helps present the pokemon character details (found in `components>modal`)

- `accessing moves data:` I had two options: use `JSON.stringify(moves,null, 2)` to display the moves object or just pick a few attributes like the moves name and url to display. I went with showing the users a json display of all the moves data.

- `Pagination: `

*** tests ***
location: `tests`

- I wrote a few tests to check for how my functions behave and also the existence of certain components. If I had more time on my side I would improve test coverage - I used 

### THINGS TO IMPROVE
- Write more tests
- Improve on adding types to my methods and jsx. Although I typed in most places, I left some types on `any`, which is not a good practice.
- Work more on responsiveness
- I would improve the UI features and invest more time in the css styling.
- On Character details, I would most likely display a larger image of Pokemon
- Better error handling - showing the user a clearer and more descriptive error message
- Optimising the search. 
- Although I did a bit of responsiveness for smaller screens, I believe I can do a neater job than where it is now.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
