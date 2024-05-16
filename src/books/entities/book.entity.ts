import { Auction } from "src/auctions/entities/auction.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  genre: string;

  @ManyToOne(() => User, user => user.books, { onDelete: 'CASCADE' }) // um usuário pode ter vários livros para vender
  seller: User;

  @OneToOne(() => Auction, auction => auction.book) // um livro pode ter apenas um leilão
  auction: Auction;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;
}
