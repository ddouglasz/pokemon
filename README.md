## POKEMON

My thought process for approaching this question started from inspecting the api to be consumed firstly.

## NAVIGATION

- First, run the development server: 
```bash
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the list of pokemons.

- Click a pokemon to get more details about them.
## LIST OF INTERESTING AREAS TO LOOK
**_ actions _**
Look into `pages>api>actions.ts` for the methods that fetch the data for the UI to consume.



- `getAllPokemonCharacters: ` this was interesting for me to fetch because I had to think of a way to access another set of data from the url that mnny async call would return. I concluded map through my returned data from the first axios call (characterSummary) then use a Promise.all()-based approach to make another call (Promise because I want all the data only when the promise have returned all of them).
I structure them in an object with my pagination data and send to the frontend where it is now available to consume when the page lands.
I chose to send only the attribues of name and image from the promise, since that is basically what we need for the frontend

- `getCharacterDetails: ` this is a straightforward axios call that sends an object to the frontend where I btoke the data into the different fields to be displayed on the frontend.
  When the function is called, I pass a character name along to complete the url for the axios call (`/pokemon/${name}`) and make an axios call. the data is returned to the component.

**_ Pages/Components _**

- `Character component: ` this component consumes the data returned from `getAllPokemonCharacters` and uses it to setState for different fields to display the needed data on each Pokemon.

- `Modal: ` this is a simple reusable component that helps present the pokemon character details (found in `components>modal`)

- `accessing moves data:` I had two options: use `JSON.stringify(moves,null, 2)` to display the moves object or just pick a few attributes like the moves name and url to display. I went with showing the users a json display of all the moves data.

- `Pagination: ` Pagination was pretty straightforward as almost everything I needed to plug into `ReactPaginate` was already coming along side the prefetched data.

- `Search: ` My approach was to have an array of all pokemons and as the user searches, if the character is greater that 3, we check the array for characters that include those characters and bring them up as suggestion to the user.

**_ tests _**
location: `tests`: I faced an issue with test config, to save time, I only just added a test in the tst file to show how I would approach it.

## WORKFLOW
- The `main` branch is sacred(lol), so I have only the setup of the project there. I have a `development` branch that contains most of the latest features of the project.

- For every feature worked on, I create a branch (e.g `feat/implement-pagination`)and raise a Pull request against development branch and then go ahead to merge it.  

- I checkout out of development latest branch to create new branches.

- Once I felt satisfied with the minimum expected feature and started improving on it, I merged to main branch.

### THINGS TO IMPROVE

- Write more tests

- Improve on adding types to my methods and jsx. Although I typed in most places, I left some types on `any`, which is not a good practice.

- Work more on responsiveness

- I would improve the UI features and invest more time in the css styling.

- On Character details, I would most likely display a larger image of Pokemon.

- Better error handling - showing the user a clearer and more descriptive error message.

- Optimising the search.

- Although I did a bit of responsiveness for smaller screens, I believe I can do a neater job than where it is now.

- Add CI/CD functionality.

- Better folder structure.

- better styling and handling of pagination.

- Add loading when a character/character image is yet to load 

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.
