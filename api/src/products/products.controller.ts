import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './product.model';
import { GetProductDto } from './dto/get-products.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/role/roles.guard';
import { Roles } from '../auth/role/roles.decorator';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @Roles('Admin', 'User')
  @ApiResponse({ status: 200, description: 'The record get successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorised access.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access the API.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  getProducts(@Query() getProductDto: GetProductDto): Promise<Product[]> {
    return this.productsService.getProducts(getProductDto);
  }

  @Post()
  @Roles('Admin')
  @ApiResponse({ status: 201, description: 'The record created successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorised access.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access the API.' })
  @ApiResponse({ status: 404, description: 'Failed to create the record.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  @ApiBody({
    type: CreateProductDto
  })
  createProduct(@Body() productDto: CreateProductDto): Promise<Product> {
    return this.productsService.createProduct(productDto);
  }

  @Put(':id')
  @Roles('Admin')
  @ApiResponse({
    status: 200,
    description: 'The record updated successfully. '
  })
  @ApiResponse({ status: 401, description: 'Unauthorised access.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access the API.' })
  @ApiResponse({ status: 404, description: 'Failed to update the record. ' })
  @ApiResponse({ status: 500, description: 'Internal server error. ' })
  @ApiBody({
    type: UpdateProductDto
  })
  updateProduct(
    @Param('id') id: number,
    @Body() productDto: UpdateProductDto
  ): Promise<number | null> {
    return this.productsService.updateProduct(id, productDto);
  }

  @Delete()
  @Roles('Admin')
  @ApiResponse({
    status: 200,
    description: 'The record deleted successfully. '
  })
  @ApiResponse({ status: 401, description: 'Unauthorised access.' })
  @ApiResponse({ status: 403, description: 'Forbidden to access the API.' })
  @ApiResponse({ status: 404, description: 'Failed to delete the record. ' })
  @ApiResponse({ status: 500, description: 'Internal server error. ' })
  deleteProductByCode(
    @Query() deleteProductDto: DeleteProductDto
  ): Promise<number | null> {
    return this.productsService.deleteProductByCode(deleteProductDto);
  }
}
