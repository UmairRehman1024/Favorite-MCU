type Movie =  {
    id: number,
    title: string,
    cover_url: string
  
}

type moviesInOrderReturn = {
    id: number;
    name: string;
    _count: {
        VoteFor: number;
        VoteAgainst: number;
    };
}

export type { Movie, moviesInOrderReturn};