import { Auction } from "src/auctions/entities/auction.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'pending' })
  status: string; // 'pending', 'accepted', 'rejected'

  @ManyToOne(() => User, (user) => user.offers)
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @ManyToOne(() => Auction, (auction) => auction.offers)
  @JoinColumn({ name: 'auction_id' })
  auction: Auction;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}