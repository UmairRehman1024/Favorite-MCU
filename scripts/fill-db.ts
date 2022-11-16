

import { prisma } from "../src/server/db/client";
import movies from "../mcu-movies.js"

export const doBackfill = async () => {

    const NUMBER_OF_MOVIES = 39;


/*
  const fill_db = movies["mcu-movies"]."mcu-movies".map((p, index) => ({
    id: index + 1,
    name: (p as { name: string }).name,
    spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));

  for (let i = 0; i>NUMBER_OF_MOVIES - 1; i++){
    let id = movies["mcu-movies"][i].id
  }
  */

  movies["mcu-movies"].map( async (movie, index,) => {
    const id = movie.id;
    const name = movie.name;
    const coverUrl = movie.cover_url;

    const creation = await prisma.movie.create({
        data: {
            id,
            name,
            coverUrl
        }
      });
    console.log(`added ${id}: ${name}`)
  })
  /*

  Object.entries(movies).forEach((movie) => {
    //const [id, name, cover_url] = movie;
    const id = movie.map((p, index) => ({
        id: index,
        name: p,
        spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          index + 1
        }.png`,
      }));
    console.log(`${id}, ${name}, ${cover_url}`);
  });

  */
  //const creation = await prisma.movie.create

  //console.log("Creation?", creation);
};

doBackfill();