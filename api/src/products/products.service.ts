import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetProductDto } from './dto/get-products.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>
  ) {}

  async getProducts(getProductDto: GetProductDto) {
    return await this.productRepository.findBy(getProductDto);
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const createdProduct = await this.productRepository.save(product);

    if (!createdProduct) {
      throw new NotFoundException(
        `Failed to create "${JSON.stringify(product)}" product`
      );
    }

    return createdProduct;
  }

  async updateProduct(
    id: number,
    product: UpdateProductDto
  ): Promise<number | null> {
    const updatedResult = await this.productRepository.update({ id }, product);
    const { affected } = updatedResult;

    if (affected === 0) {
      throw new NotFoundException(`Failed to upate product with ID "${id}"`);
    }

    return affected;
  }

  async deleteProductByCode(
    deleteProductDto: DeleteProductDto
  ): Promise<number | null> {
    const deletedResult = await this.productRepository.delete(deleteProductDto);
    const { affected } = deletedResult;

    if (affected === 0) {
      throw new NotFoundException(
        `Failed to delete product with code "${deleteProductDto.code}"`
      );
    }

    return affected;
  }
}
