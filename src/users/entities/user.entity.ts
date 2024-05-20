import { Book } from "src/books/entities/book.entity";
import { Offer } from "src/offers/entities/offer.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserType } from "../enum/user-type";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_name', unique: true })
  username: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserType, default: UserType.BUYER })
  type: UserType;

  @OneToMany(() => Book, book => book.seller)
  books: Book[];

  @OneToMany(() => Offer, offer => offer.buyer)
  offers: Offer[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
