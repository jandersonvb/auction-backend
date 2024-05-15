import { Book } from "src/books/entities/book.entity";
import { Offer } from "src/offers/entities/offer.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_name', unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ default: 'both' })
  type: string; // 'seller', 'buyer', 'both'

  @OneToMany(() => Book, book => book.seller)
  books: Book[];

  @OneToMany(() => Offer, offer => offer.buyer)
  offers: Offer[];

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
