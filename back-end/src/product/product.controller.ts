// src/product/product.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/Product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

@Post('bulk')
createBulk(@Body() products: CreateProductDto[]) {
  return products.map(product => this.productService.create(product));
}



  @Get()
  getProducts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('cursor') cursor?: number,
  ) {
    return this.productService.getProducts({ page, limit, cursor });
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(Number(id));
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(Number(id), dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(Number(id));
  }

  // ----- UPLOAD IMAGE -----
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, callback) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueName + extname(file.originalname));
        },
      }),
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Image uploaded successfully',
      imageUrl: `/uploads/products/${file.filename}`,
    };
  }
}
