import { Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  deleteOne(id: string): boolean {
    this.movies = this.movies.filter((movie) => movie.id !== +id);
    return true;
  }
  createOne(movieData) {
    console.log(movieData);
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  updateOne(id: string, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
