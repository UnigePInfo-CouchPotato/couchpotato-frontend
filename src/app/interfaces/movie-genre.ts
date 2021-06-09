export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieGenreResponse {
  genres: MovieGenre[];
}
