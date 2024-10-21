import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { GetProductDto } from './dto/get-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { Repository } from 'typeorm';

describe.only('ProductsService', () => {
  let service: ProductsService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            findBy: jest.fn().mockResolvedValue([
              {
                id: 1,
                code: '1000',
                description: 'Sedan',
                location: 'East',
                price: 200
              },
              {
                id: 2,
                code: '1000',
                description: 'Sedan',
                location: 'West',
                price: 300
              }
            ]),
            save: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          }
        }
      ]
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    const result = await service.getProducts(new GetProductDto());
    expect(result).toHaveLength(2);
    expect(result).toEqual([
      {
        id: 1,
        code: '1000',
        description: 'Sedan',
        location: 'East',
        price: 200
      },
      {
        id: 2,
        code: '1000',
        description: 'Sedan',
        location: 'West',
        price: 300
      }
    ]);
  });

  it('should return a new created product', async () => {
    (productRepository.save as jest.Mock).mockResolvedValue({
      id: 3,
      code: 2000,
      description: 'Sedan',
      location: 'Labuan',
      price: 100
    });

    const result = await service.createProduct(new CreateProductDto());
    expect(result.code).toBe(2000);
    expect(result.description).toBe('Sedan');
    expect(result.location).toBe('Labuan');
    expect(result.price).toBe(100);
  });

  it('should thow "NotFoundException" when failed to create product', async () => {
    (productRepository.save as jest.Mock).mockResolvedValue(null);

    const product = new CreateProductDto();
    product.code = 2000;
    product.description = 'Sedan';
    product.location = 'Labuan';
    product.price = 100;

    await expect(service.createProduct(product)).rejects.toThrow(
      new NotFoundException(
        `Failed to create "${JSON.stringify({
          code: 2000,
          description: 'Sedan',
          location: 'Labuan',
          price: 100
        })}" product`
      )
    );
  });

  it('should return 1 to indicate 1 row updated', async () => {
    (productRepository.update as jest.Mock).mockResolvedValue({
      affected: 1
    });

    const result = await service.updateProduct(1, new UpdateProductDto());
    expect(result).toBe(1);
  });

  it('should thow "NotFoundException" when failed to update product', async () => {
    (productRepository.update as jest.Mock).mockResolvedValue({
      affected: 0
    });

    await expect(
      service.updateProduct(1, new UpdateProductDto())
    ).rejects.toThrow(
      new NotFoundException('Failed to upate product with ID "1"')
    );
  });

  it('should return 1 to indicate 1 row deleted', async () => {
    (productRepository.delete as jest.Mock).mockResolvedValue({
      affected: 1
    });

    const result = await service.deleteProductByCode(new DeleteProductDto());
    expect(result).toBe(1);
  });

  it('should thow "NotFoundException" when failed to create product', async () => {
    (productRepository.delete as jest.Mock).mockResolvedValue({
      affected: 0
    });

    const product = new DeleteProductDto();
    product.code = 2000;

    await expect(service.deleteProductByCode(product)).rejects.toThrow(
      new NotFoundException('Failed to delete product with code "2000"')
    );
  });
});
