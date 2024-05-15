import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { OffersModule } from './offers/offers.module';
import { AuctionsModule } from './auctions/auctions.module';
import { GoogleBooksService } from './google-books/google-books.service';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    BooksModule,
    OffersModule,
    AuctionsModule],
  controllers: [],
  providers: [GoogleBooksService],
})
export class AppModule { }
