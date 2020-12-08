import { Injectable } from '@nestjs/common';
import { throws } from 'assert';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './entities/movies.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    return this.movies.find((movie) => movie.id === id);
  }

  deleteOne(id: number): boolean {
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return true;
  }
  createOne(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
  updateOne(id: number, updateData) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
