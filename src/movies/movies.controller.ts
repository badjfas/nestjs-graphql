import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
  @Post()
  create() {
    return `this will create a movie  `;
  }
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return `this will delete a movie ${id} `;
  }

  @Patch('/:id')
  patch(@Param('id') id: string) {
    return `this will patch a movie ${id} `;
  }
}
