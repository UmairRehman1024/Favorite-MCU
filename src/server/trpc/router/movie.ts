import { z } from "zod";

import { router, publicProcedure,} from "../trpc";
import { TRPCError } from "@trpc/server";

/*

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});

*/



export const movieRouter = router({
  getOne: publicProcedure
    .input(z.object({ id: z.number().nullish() }).nullish())
    .query (async ({ input }) => {

      if (input==null||input==undefined)
       throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You need to give an id',
      });


      const url = `https://mcuapi.herokuapp.com/api/v1/movies/` + input.id
      const response = await (fetch(url)
      .then((response) => response.json()))
  
       
      return response
    }),
  castVote: publicProcedure
    .input(z.object({ movieFor: z.number(), movieAgainst: z.number() }))
    .mutation( async ({ctx,  input }) => {

      const voteInDb = await ctx.prisma.vote.create({
        data: {
          votedAgainstId: input.movieAgainst,
          votedForId: input.movieFor,
        },
      });

      
      return { success: true, vote: voteInDb };
    })

});

/*

.query("get-movie-by-id", {
    input: z
      .object({
        id: z.number().nullish(),
      })
      .nullish(),
    async resolve({ input }) {
      if (input==null||input==undefined)
       throw new trpc.TRPCError({
        code: 'BAD_REQUEST',
        message: 'You need to give an id',
      });
        //let Apiresponse: mcuApiMovieResponse = defaultApiResponse
        //let dataResponse
        const url = `https://mcuapi.herokuapp.com/api/v1/movies/` + input.id
        const response = await (fetch(url)
        .then((response) => response.json()))
        // .then((data) =>  {
        //   console.log(data)
        //   dataResponse = data
        // });
       
        return response
    },
  }) 
  
  */