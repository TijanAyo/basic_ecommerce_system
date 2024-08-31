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
  createProductResponseDto,
  updateProductDto,
  updateProductStatusDto,
} from './dtos';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountGuard, AuthorizeGuard, RolesGuard } from '../common/guards';
import { Roles } from '../common/decorators';
import { roles } from '../common/interfaces';
import { ErrorResponseDto } from '../common/helpers';

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: 'View all approved products' })
  @Get('all-products')
  async viewAllProducts(@Req() req: any) {
    const { page = 1, pageSize = 10 } = req.query;
    return await this._productService.viewAllProducts(page, pageSize);
  }

  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: 'View product by ID' })
  @Get('view/:productId')
  async viewProductDetails(@Param('productId') productId) {
    return await this._productService.viewProductDetails(productId);
  }

  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @ApiCreatedResponse({
    type: createProductResponseDto,
  })
  @ApiOperation({ summary: 'Create a new product' })
  @UseGuards(AuthorizeGuard, AccountGuard)
  @Post('new')
  async createProduct(@Body() payload: createProductDto, @Req() req: any) {
    const user = req.user;
    return await this._productService.createProduct(payload, user.sub);
  }

  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: 'Update product by ID' })
  @UseGuards(AuthorizeGuard, AccountGuard)
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

  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @ApiOperation({ summary: 'Delete product by ID' })
  @UseGuards(AuthorizeGuard, AccountGuard)
  @Delete('delete/:productId')
  async deleteProduct(@Param('productId') productId: string, @Req() req: any) {
    const user = req.user;
    return await this._productService.deleteProduct(productId, user.sub);
  }

  @ApiResponse({
    status: 400,
    description: 'Bad Request',
    type: ErrorResponseDto,
  })
  @ApiOperation({
    summary: 'Approve or Disapprove products - Admin functionality',
  })
  @UseGuards(AuthorizeGuard, AccountGuard, RolesGuard)
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
