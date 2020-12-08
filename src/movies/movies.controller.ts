import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
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
  create(@Body() movieData) {
    return this.movieService.createOne(movieData);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Movie {
    return this.movieService.getOne(id);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string): boolean {
    this.movieService.deleteOne(id);
    return true;
  }
}
