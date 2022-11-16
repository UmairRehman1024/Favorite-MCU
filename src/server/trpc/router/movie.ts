import { z } from "zod";

import { router, publicProcedure,} from "../trpc";
import { TRPCError } from "@trpc/server";



export const movieRouter = router({
  getOne: publicProcedure
    .input(z.object({ id: z.number().nullish() }).nullish())
    .query (async ({ ctx, input }) => {

      if (input?.id==null||input?.id==undefined)
       throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'You need to give an id',
      });

/*
      const url = `https://mcuapi.herokuapp.com/api/v1/movies/` + input.id
      const response = await (fetch(url)
      .then((response) => response.json()))
*/
      const movie = await ctx.prisma.movie.findUnique({
        where: {
          id: input.id,
        },
        select: {
          id: true,
          name: true,
          coverUrl: true
        }
      })
       
      return movie
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
