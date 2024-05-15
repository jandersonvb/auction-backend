import { Auction } from "src/auctions/entities/auction.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => User, user => user.books) // um usuário pode ter vários livros para vender
  seller: User;

  @OneToOne(() => Auction, auction => auction.book) // um livro pode ter apenas um leilão
  auction: Auction;
}
