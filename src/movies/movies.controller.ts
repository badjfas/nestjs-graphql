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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll(): string {
    return 'hello';
  }

  @Get('/:id')
  getMovie(@Param('id') id: string): void {
    console.log('hello', id);
  }
  @Post('create')
  create(@Body() movieData) {
    console.log(movieData);
    return movieData;
  }
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `we are searching for a movie ${searchingYear}`;
  }
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `this will delete a movie ${id} `;
  }

  @Patch('/:id')
  patch(@Param('id') id: string, @Body() updateData) {
    return {
      updatedMovieId: id,
      ...updateData,
    };
  }
}
