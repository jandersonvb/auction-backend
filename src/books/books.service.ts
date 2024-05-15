import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async update(id: string, updateBookDto: Partial<CreateBookDto>): Promise<Book> {
    const book = await this.findOne(id);

    return this.bookRepository.save({ ...book, ...updateBookDto });
  }

  async remove(id: string): Promise<void> {
    const book = await this.findOne(id);

    await this.bookRepository.remove(book);
  }
}
