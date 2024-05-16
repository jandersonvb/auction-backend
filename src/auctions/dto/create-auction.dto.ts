import { IsOptional, IsString } from "class-validator";
import { StatusType } from "../enum/status-type";

export class CreateAuctionDto {
  @IsOptional()
  @IsString()
  bookId?: string;

  @IsOptional()
  @IsString()
  sellerId?: string;

  @IsOptional()
  status?: StatusType;
}
