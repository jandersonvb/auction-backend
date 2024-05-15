import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleBooksService {
  private readonly apiURL = 'https://www.googleapis.com/books/v1/volumes?q=';

  async searchBooks(query: string) {
    const response = await fetch(`${this.apiURL}${query}`);
    return response.json();
  }
}
