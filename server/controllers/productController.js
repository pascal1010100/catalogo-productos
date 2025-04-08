import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Post('checkout')
  async checkout(@Body() createOrderDto: CreateOrderDto) {
    return this.productsService.checkout(createOrderDto);
  }
}