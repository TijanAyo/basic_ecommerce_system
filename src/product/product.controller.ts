import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDto, updateProductDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard } from '../common/guards';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Get('all-products')
  async viewAllProducts(@Req() req: any) {
    const { page = 1, pageSize = 10 } = req.query;
    return await this._productService.viewAllProducts(page, pageSize);
  }

  @UseGuards(AuthorizeGuard)
  @Post('new')
  async createProduct(@Body() payload: createProductDto, @Req() req: any) {
    const user = req.user;
    return await this._productService.createProduct(payload, user.sub);
  }

  @UseGuards(AuthorizeGuard)
  @Patch('update/:productId')
  async updateProduct(
    @Body() payload: updateProductDto,
    @Param() productId: string,
    @Req() req: any,
  ) {
    const user = req.user;
    return await this._productService.updateProduct(
      payload,
      productId,
      user.sub,
    );
  }

  @UseGuards(AuthorizeGuard)
  @Delete('delete/:productId')
  async deleteProduct() {}
}
