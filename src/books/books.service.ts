import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const bookAlreadyExists = await this.bookRepository.findOne({ where: { title: createBookDto.title } });

    if (bookAlreadyExists) {
      throw new ConflictException("Book already exists");
    }

    const book = this.bookRepository.create(createBookDto);

    return this.bookRepository.save(book);
  }

  // findAll() {
  //   return `This action returns all books`;
  // }

  // findOne(id: string) {
  //   return `This action returns a #${id} book`;
  // }

  // update(id: string, updateBookDto: UpdateBookDto) {
  //   return `This action updates a #${id} book`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} book`;
  // }
}
