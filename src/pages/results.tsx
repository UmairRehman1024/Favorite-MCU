import { trpc } from "../utils/trpc";
import type {moviesInOrderReturn} from "../types/Movie"
import Head from "next/head";
import Navbar from "../components/navbar";


const ResultsPage = () => {
    const moviesInOrder = trpc.movie.getMoviesInOrder.useQuery()

    if (moviesInOrder.isLoading){
        return (
          <div className="flex justify-center align-middle w-screen h-screen">
            <img src="/rings.svg" className="w-48" />
          </div>
        )
    }
    
    if (moviesInOrder.isError){
        return <h1 className="text-4xl">Error</h1>
    }
    
    //to get rid of type errors
    if (moviesInOrder == null || moviesInOrder == undefined) {
        return <div>error</div>
    }

   

      
      
    return (
      <>
        <Navbar></Navbar>
        <div className="flex flex-col items-center pt-20">
          <Head>
            <title>Favourite MCU Movie Results</title>
          </Head>
          <h2 className="text-2xl p-4">Results</h2>
          <div className="flex flex-col w-full max-w-2xl border">
            {moviesInOrder.data
              .sort((a, b) => {
                const difference =
                  generateCountPercent(b) - generateCountPercent(a);
    
                if (difference === 0) {
                  return b._count.VoteFor - a._count.VoteFor;
                }
    
                return difference;
              })
              .map((currentMovie, index) => {
                return <ResultRow Movie={currentMovie} key={index} rank={index + 1} />;
              })}
          </div>
        </div>
      </>
      );

}

const generateCountPercent = (Movie: moviesInOrderReturn) => {
    const { VoteFor, VoteAgainst } = Movie._count;
    if (VoteFor + VoteAgainst === 0) {
      return 0;
    }
    return (VoteFor / (VoteFor + VoteAgainst)) * 100;
};

const ResultRow:React.FC<{
    Movie: moviesInOrderReturn,
    rank: number 
}> = (props) => {

    return (
        <div className="relative flex border-b p-2 items-center justify-between">
          <div className="flex items-center">
             <div className="flex items-center pl-4">
                <div className="pl-2 capitalize">{props.Movie.name}</div>
            </div>
          </div>
          <div className="pr-4">
            {generateCountPercent(props.Movie).toFixed(2) + "%"}
          </div>
          <div className="absolute top-0 left-0 z-20 flex items-center justify-center px-2 font-semibold text-white bg-gray-600 border border-gray-500 shadow-lg rounded-br-md">
            {props.rank}
          </div>
        </div>
      );
}

export default ResultsPage;