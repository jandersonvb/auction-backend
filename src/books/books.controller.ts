import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GoogleBooksService } from 'src/google-books/google-books.service';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly googleBooksService: GoogleBooksService
  ) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto, seller: User) {
    return this.booksService.create(createBookDto, seller);
  }

  @Get('search/:query')
  search(@Param('query') query: string) {
    return this.googleBooksService.searchBooks(query);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get('find')
  findOne(@Query('title') title: string) {
    return this.booksService.findOne(title);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }


}
