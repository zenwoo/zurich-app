import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DeleteProductDto {
  @ApiProperty()
  @IsNotEmpty()
  code: number;
}
