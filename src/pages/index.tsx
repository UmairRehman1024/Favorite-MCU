import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import { getOptionsForVote } from "../utils/getRandomMovie";
import { useState } from "react";
import React from "react";
import Router from "next/router";
import { Movie } from "../types/Movie";
import { doBackfill } from "../../scripts/fill-db";

import Navbar from "../components/navbar";

const Home: NextPage = () => {
  //doBackfill();

  //get 2 random ids
  const [ids, updateids] = useState(() => getOptionsForVote());
  const [first, second] = ids;

  //const firstMovie = trpc.useQuery(["movie.get-movie-by-id", {id: first}])
  //const secondMovie = trpc.useQuery(["movie.get-movie-by-id", {id: second}])

  //get movies from database
  const fMovie = trpc.movie.getOne.useQuery({ id: first });
  const sMovie = trpc.movie.getOne.useQuery({ id: second });

  //get data from fMovie/sMovie
  const firstMovie = fMovie.data;
  const secondMovie = sMovie.data;

  const voteMutation = trpc.movie.castVote.useMutation();

  if (fMovie.isLoading || sMovie.isLoading) {
    return (
      <div className="flex h-screen w-screen  justify-center align-middle dark:bg-gray-800">
        <img src="/rings.svg" className="w-48" />
      </div>
    );
  }

  if (fMovie.isError || sMovie.isError) {
    return <h1>There was an error</h1>;
  }

  //to get rid of type errors

  if (
    firstMovie == null ||
    secondMovie == null ||
    firstMovie == undefined ||
    secondMovie == undefined
  ) {
    return (
      <div className="flex h-screen w-screen  justify-center align-middle dark:bg-gray-800">
        <img src="/rings.svg" className="w-48" />
      </div>
    );
  }

  const Vote = (selected: number) => {
    if (
      firstMovie == null ||
      secondMovie == null ||
      firstMovie == undefined ||
      secondMovie == undefined
    )
      return;

    if (selected === firstMovie.id) {
      // If voted for 1st Movie, fire voteFor with first ID
      voteMutation.mutate({
        movieFor: firstMovie.id,
        movieAgainst: secondMovie.id,
      });
    } else {
      // else fire voteFor with second ID
      voteMutation.mutate({
        movieFor: secondMovie.id,
        movieAgainst: firstMovie.id,
      });
    }
    Router.reload();
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="flex min-h-screen  flex-col justify-center dark:bg-gray-800">
        <div className="mx-auto flex h-full w-11/12 flex-col items-center justify-center gap-2 pt-20 sm:flex-row sm:p-0">
          <Card
            id={firstMovie.id}
            name={firstMovie?.name}
            cover_url={firstMovie?.coverUrl}
            vote={() => Vote(firstMovie.id)}
          ></Card>
          <div className="font-sans font-bold">OR</div>
          <Card
            id={secondMovie.id}
            name={secondMovie?.name}
            cover_url={secondMovie?.coverUrl}
            vote={() => Vote(firstMovie.id)}
          ></Card>
        </div>
      </div>
    </>
  );
};

/*  return (<>
      <Navbar></Navbar>
      <div  className="dark:bg-gray-800 min-h-screen  flex flex-col justify-center">
        <div className="pt-20 sm:p-0 flex flex-col gap-2 justify-center items-center sm:flex-row w-11/12 mx-auto h-full">
          {firstMovie && secondMovie && (
            <>
              <Card id={firstMovie.id} name={firstMovie?.name} cover_url={firstMovie?.coverUrl} vote={() => Vote(firstMovie.id)}></Card>
              <div className="font-sans font-bold">OR</div>
              <Card id={secondMovie.id} name={secondMovie?.name} cover_url={secondMovie?.coverUrl} vote={() => Vote(firstMovie.id)}></Card>
            </>
          )}
          {!fMovie && !sMovie && (//
            <div className="flex justify-center align-middle w-screen h-screen">
              <img src="/rings.svg" className="w-48" />
           </div>
          )}

        </div>
      </div>
  </>
  );
}; */

/*
      <Card Movie={firstMovie}  vote={() => Vote(firstMovie.id)}> </Card>

      <div className="font-sans font-bold">OR</div>
      
      <Card id={secondMovie.id} title={secondMovie?.title} image={secondMovie?.cover_url}></Card>
*/

const Card: React.FC<{
  id: number;
  name: string;
  cover_url: string;
  vote: () => void;
}> = (props) => {
  return (
    <div
      className="card min-h-566px bg-base-100 cursor-pointer shadow-xl transition-opacity "
      onClick={() => props.vote()}
    >
      <figure>
        <Image
          alt={props.name}
          width={382}
          height={566}
          src={props.cover_url}
        ></Image>
      </figure>
      {/* <div className="card-body">
        <h2 className="card-title justify-center ">{Movie.title}</h2>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Vote</button>
        </div>
      </div> */}
    </div>
  );
};

export default Home;
