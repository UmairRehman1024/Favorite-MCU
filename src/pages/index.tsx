import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { trpc } from "../utils/trpc";
import {getOptionsForVote} from  "../utils/getRandomMovie"
import { useState } from "react";
import React from "react";

type CardProps =  {
  title: string,
  image: string

}

const Home: NextPage = () => {
  const [ids, updateids] = useState(() => getOptionsForVote());

  const[first, second] = ids
  
  //const firstMovie = trpc.useQuery(["movie.get-movie-by-id", {id: first}])
  //const secondMovie = trpc.useQuery(["movie.get-movie-by-id", {id: second}])
  const firstMovie = trpc.movie.getOne.useQuery({id : first})
  const secondMovie = trpc.movie.getOne.useQuery({id : second})
  

  if (firstMovie.isLoading || secondMovie.isLoading){
    return <h1>Loading...</h1>
  }

  if (firstMovie.isError || secondMovie.isError){

    
    return <h1>There was an error</h1>


  }
  
  return (<>
    <div className="bg-blue-200 navbar">
        <a className="btn btn-ghost normal-case text-xl">Favourite MCU Movie</a>
    </div>
    <div  className="bg-gray-100 flex flex-col gap-2 w-screen min-h-screen justify-center items-center sm:flex-row ">
      
      
      <Card  title={firstMovie.data?.title} image={firstMovie.data?.cover_url}></Card>

      <div className="font-sans font-bold">OR</div>
      
      <Card title={secondMovie.data?.title} image={secondMovie.data?.cover_url}></Card>
    
    </div>
  </>
  );
};

const Card = (CardProps:CardProps) => {

  function handleOnClick(){
    

  }

  return(
    <div className="card min-h-566px bg-base-100 shadow-xl cursor-pointer " onClick={() => handleOnClick()}>
      <figure><Image alt={CardProps.title}  width={382} height={566}  src={CardProps.image}></Image></figure>
      {/* <div className="card-body">
        <h2 className="card-title justify-center ">{CardProps.title}</h2>
        <div className="card-actions justify-center">
          <button className="btn btn-primary">Vote</button>
        </div>
      </div> */}
    </div>
  )
}


export default Home;



