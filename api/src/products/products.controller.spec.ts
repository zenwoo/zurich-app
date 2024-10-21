import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { GetProductDto } from './dto/get-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            getProducts: jest.fn().mockResolvedValue([
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
            createProduct: jest.fn().mockResolvedValue({
              id: 3,
              code: 2000,
              description: 'Sedan',
              location: 'Labuan',
              price: 100
            }),
            updateProduct: jest.fn().mockResolvedValue(1),
            deleteProductByCode: jest.fn().mockResolvedValue(1)
          }
        }
      ]
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all products', async () => {
    const result = await controller.getProducts(new GetProductDto());
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
    const result = await controller.createProduct(new CreateProductDto());
    expect(result.code).toBe(2000);
    expect(result.description).toBe('Sedan');
    expect(result.location).toBe('Labuan');
    expect(result.price).toBe(100);
  });

  it('should return 1 to indicate 1 row updated', async () => {
    const result = await controller.updateProduct(1, new UpdateProductDto());
    expect(result).toBe(1);
  });

  it('should return 1 to indicate 1 row deleted', async () => {
    const result = await controller.deleteProductByCode(new DeleteProductDto());
    expect(result).toBe(1);
  });
});
