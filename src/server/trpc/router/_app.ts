import { router } from "../trpc";
import { authRouter } from "./auth";
import { movieRouter } from "./movie";

export const appRouter = router({
  movie: movieRouter,
  auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
