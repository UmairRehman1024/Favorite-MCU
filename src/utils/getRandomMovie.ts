const MAX_Movie_ID = 29;
//29 = thor: love and thunder

export const getRandomMovie: (notThisOne?: number) => number = (
  notThisOne
) => {
  const MovieNumber = Math.floor(Math.random() * MAX_Movie_ID) + 1;

  if (MovieNumber !== notThisOne) return MovieNumber;
  return getRandomMovie(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomMovie();
  const secondId = getRandomMovie(firstId);

  return [firstId, secondId];
};