import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import {getOptionsForVote} from  "../utils/getRandomMovie"
import { useState } from "react";
import React from "react";



type Movie =  {
  id: number,
  title: string,
  cover_url: string

}

const Home: NextPage = () => {
  const [ids, updateids] = useState(() => getOptionsForVote());

  const[first, second] = ids
  
  //const firstMovie = trpc.useQuery(["movie.get-movie-by-id", {id: first}])
  //const secondMovie = trpc.useQuery(["movie.get-movie-by-id", {id: second}])
  

  const fMovie = trpc.movie.getOne.useQuery({id: first})
  const sMovie = trpc.movie.getOne.useQuery({id : second})

  const firstMovie = fMovie.data
  const secondMovie = sMovie.data

  const voteMutation = trpc.movie.castVote.useMutation()
  

  if (fMovie.isLoading || sMovie.isLoading){
    return <h1>Loading...</h1>
  }

  if (fMovie.isError || sMovie.isError){

    
    return <h1>There was an error</h1>


  }

  if (firstMovie == null|| secondMovie == null || firstMovie == undefined|| secondMovie == undefined) {
    return <div>error</div>
  }

  const Vote = (selected: number) => {
    if (firstMovie == null|| secondMovie == null || firstMovie == undefined|| secondMovie == undefined) return

    if (selected === firstMovie.id) {
      // If voted for 1st pokemon, fire voteFor with first ID
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
  }

  
  

  
  return (<>
    <div className="bg-blue-200 navbar">
        <a className="btn btn-ghost normal-case text-xl">Favourite MCU Movie</a>
    </div>
    <div  className="bg-gray-100 flex flex-col gap-2 w-screen min-h-screen justify-center items-center sm:flex-row ">
      
      <Card id={firstMovie.id} name={firstMovie?.name} cover_url={firstMovie?.coverUrl} vote={() => Vote(firstMovie.id)}></Card>


      <div className="font-sans font-bold">OR</div>

      <Card id={secondMovie.id} name={secondMovie?.name} cover_url={secondMovie?.coverUrl} vote={() => Vote(firstMovie.id)}></Card>
    
      
    
    </div>
  </>
  );
};

/*
      <Card Movie={firstMovie}  vote={() => Vote(firstMovie.id)}> </Card>

      <div className="font-sans font-bold">OR</div>
      
      <Card id={secondMovie.id} title={secondMovie?.title} image={secondMovie?.cover_url}></Card>
*/

const Card: React.FC<{

  id:number,
  name:string,
  cover_url: string
  vote: () => void;

}> = (props) => {


  return(
    <div className="card min-h-566px bg-base-100 shadow-xl cursor-pointer " onClick={() => props.vote()}>
      <figure><Image alt={props.name}  width={382} height={566}  src={props.cover_url}></Image></figure>
      {/* <div className="card-body">
        <h2 className="card-title justify-center ">{Movie.title}</h2>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Vote</button>
        </div>
      </div> */}
    </div>
  )
}


export default Home;



