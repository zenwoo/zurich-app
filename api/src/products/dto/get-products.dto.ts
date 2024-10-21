import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  code: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  location: string;
}
