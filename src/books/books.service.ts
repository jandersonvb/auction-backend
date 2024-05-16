import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) { }

  async create(createBookDto: CreateBookDto, seller: User): Promise<Book> {
    const book = this.bookRepository.create({ ...createBookDto, seller });

    if (book) {
      throw new ConflictException("Book already exists");
    }

    return this.bookRepository.save(book);

  }

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['seller'] });
  }

  async findOne(title: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { title }, relations: ['seller'] });

    if (!book) {
      throw new NotFoundException("Book not found");
    }

    return book;
  }

  async update(id: string, updateBookDto: Partial<CreateBookDto>): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException("Book not found");
    }

    Object.assign(book, updateBookDto);

    return this.bookRepository.save(book);
  }

  async remove(id: string): Promise<void> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException("Book not found");
    }

    await this.bookRepository.remove(book);
  }
}
