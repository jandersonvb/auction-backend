import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuctionDto } from './dto/create-auction.dto';
import { UpdateAuctionDto } from './dto/update-auction.dto';
import { Auction } from './entities/auction.entity';

@Injectable()
export class AuctionsService {
  constructor(@InjectRepository(Auction) private readonly auctionRepository: Repository<Auction>) { }

  async create(createAuctionDto: CreateAuctionDto): Promise<Auction> {
    const auction = this.auctionRepository.create(createAuctionDto);

    if (!auction) {
      throw new NotFoundException("Auction not found");
    }

    return this.auctionRepository.save(auction);
  }

  async findAll(): Promise<Auction[]> {
    return this.auctionRepository.find();
  }

  async findOne(id: string) {
    const auction = await this.auctionRepository.findOne({ where: { id } });

    if (!auction) {
      throw new NotFoundException("Auction not found");
    }

    return auction;
  }

  async update(id: string, updateAuctionDto: UpdateAuctionDto): Promise<Auction> {
    const auction = await this.auctionRepository.findOne({ where: { id } });

    if (!auction) {
      throw new NotFoundException("Auction not found");
    }

    Object.assign(auction, updateAuctionDto);

    return this.auctionRepository.save(auction);
  }

  async remove(id: string): Promise<void> {
    const auction = await this.auctionRepository.findOne({ where: { id } });

    if (!auction) {
      throw new NotFoundException("Auction not found");
    }

    await this.auctionRepository.remove(auction);
  }
}
