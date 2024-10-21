import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: number;

  @Column({ length: 500, nullable: true })
  description: string;

  @Column()
  location: string;

  @Column({ type: 'decimal', scale: 2, default: 0 })
  price: number;
}
