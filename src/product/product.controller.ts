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
import {
  createProductDto,
  updateProductDto,
  updateProductStatusDto,
} from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { AuthorizeGuard, RolesGuard } from '../common/guards';
import { Roles } from '../common/decorators';
import { roles } from '../common/interfaces';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Get('all-products')
  async viewAllProducts(@Req() req: any) {
    const { page = 1, pageSize = 10 } = req.query;
    return await this._productService.viewAllProducts(page, pageSize);
  }

  @Get('view/:productId')
  async viewProductDetails(@Param('productId') productId) {
    return await this._productService.viewProductDetails(productId);
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
    @Param('productId') productId: string,
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
  async deleteProduct(@Param('productId') productId: string, @Req() req: any) {
    const user = req.user;
    return await this._productService.deleteProduct(productId, user.sub);
  }

  @UseGuards(AuthorizeGuard, RolesGuard)
  @Roles(roles.admin)
  @Patch('/:productId/approve-or-disapprove')
  async updateProductStatus(
    @Param('productId') productId: string,
    @Body() payload: updateProductStatusDto,
    @Req() req: any,
  ) {
    const user = req.user;
    return await this._productService.updateProductStatus(
      payload,
      productId,
      user.sub,
    );
  }
}
