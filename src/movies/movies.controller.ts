import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movies.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}
  @Get()
  getAll(): Movie[] {
    return this.movieService.getAll();
  }

  @Post('create')
  create(@Body() movieData: CreateMovieDto) {
    return this.movieService.createOne(movieData);
  }

  @Get(':id')
  getOne(@Param('id') id: number): Movie {
    const movie = this.movieService.getOne(id);
    if (!movie) {
      throw new NotFoundException(`Movie id not Found :${id}`);
    } else {
      return movie;
    }
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number): boolean {
    this.getOne(id);
    this.movieService.deleteOne(id);
    return true;
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.updateOne(id, updateData);
  }
}
