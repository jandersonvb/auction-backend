import { Book } from 'src/books/entities/book.entity';
import { Offer } from 'src/offers/entities/offer.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne, Column } from 'typeorm';
import { StatusType } from '../enum/status-type';


@Entity()
export class Auction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Book, book => book.auction) // Um leilão tem um livro associado a ele (OneToOne)
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => User, user => user.books, { onDelete: 'CASCADE' }) // Um usuário pode ter vários livros para leiloes (ManyToOne)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @OneToMany(() => Offer, offer => offer.auction) // Um leilão tem várias ofertas associadas a ele (OneToMany)
  offers: Offer[];

  @Column({ type: 'enum', enum: StatusType, default: StatusType.ACTIVE })
  status: StatusType; // 'active', 'closed', 'ongoing'

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

}