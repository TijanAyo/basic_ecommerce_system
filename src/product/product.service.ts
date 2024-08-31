import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ProductRepositoryService } from '../repository/product-repository/product-repository.service';
import { AppResponse, ErrorMessage } from '../common/helpers';
import {
  createProductPayload,
  updateProductPayload,
  updateProductStatusPayload,
} from '../common/interfaces';
import * as _ from 'lodash';

@Injectable()
export class ProductService {
  constructor(private readonly _productRepository: ProductRepositoryService) {}

  async viewAllProducts(page: string, pageSize: string) {
    try {
      const products = await this._productRepository.viewProducts(
        page,
        pageSize,
      );

      if (products.products.length == 0) {
        return AppResponse.Ok(null, `No products are available right now`);
      }

      const sanitizedData = products.products.map((product) =>
        _.pick(product, [
          'id',
          'name',
          'summary',
          'quantity',
          'price',
          'category',
        ]),
      );

      const metadata = {
        currentPage: products.currentPage,
        hasNextPage: products.currentPage < products.totalPages,
        hasPreviousPage: products.currentPage > 1,
      };

      return AppResponse.Ok(
        { products: sanitizedData, metadata },
        `All available products has fetched successfully`,
      );
    } catch (e) {
      console.error(
        `Error in viewAllProducts: Unable to fetch products`,
        e.message,
        e.stack,
      );
      throw e;
    }
  }

  async viewProductDetails(productId: string) {
    try {
      const productExist =
        await this._productRepository.findProductById(productId);

      if (!productExist) {
        throw new NotFoundException(
          AppResponse.Error(
            `Product with ID: #${productId} not found, check input and try again`,
            ErrorMessage.NOT_FOUND,
          ),
        );
      }

      const sanitizedData = _.pick(productExist, [
        'id',
        'name',
        'summary',
        'description',
        'price',
        'quantity',
        'category',
        'status',
        'ownerId',
        'updatedAt',
        'createdAt',
      ]);

      return AppResponse.Ok(
        sanitizedData,
        `Fetched product information successfully`,
      );
    } catch (e) {
      console.error(
        `Error in viewProductDetails: Unable to view product details`,
        e.message,
        e.stack,
      );
      throw e;
    }
  }

  async createProduct(payload: createProductPayload, userId: string) {
    try {
      const createNewProduct = await this._productRepository.addNewProduct(
        payload,
        userId,
      );

      if (!createNewProduct) {
        console.error(`Error creating product`);
        throw new BadRequestException(
          AppResponse.Error(
            `An unexpected error occurred while creating product`,
            ErrorMessage.BAD_REQUEST,
          ),
        );
      }

      const sanitizedData = _.pick(createNewProduct, [
        'id',
        'name',
        'summary',
        'description',
        'price',
        'quantity',
        'category',
        'updatedAt',
        'createdAt',
      ]);

      return AppResponse.Ok(
        sanitizedData,
        `Product created successfully and awaiting approval`,
      );
    } catch (e) {
      console.error(
        `Error in createProduct: Unable to create product`,
        e.message,
        e.stack,
      );
      throw e;
    }
  }

  async updateProduct(
    payload: updateProductPayload,
    productId: string,
    userId: string,
  ) {
    try {
      const productExist =
        await this._productRepository.findProductById(productId);

      if (!productExist) {
        throw new NotFoundException(
          AppResponse.Error(
            `Product with ID: #${productId} not found, check input and try again`,
            ErrorMessage.NOT_FOUND,
          ),
        );
      }

      if (productExist.ownerId !== userId) {
        throw new UnauthorizedException(
          AppResponse.Error(
            `You are not authorized to make this change`,
            ErrorMessage.UNAUTHORIZED,
          ),
        );
      }

      const modifiedProduct = await this._productRepository.modifyProduct(
        payload,
        productId,
      );

      const sanitizedData = _.pick(modifiedProduct, [
        'id',
        'name',
        'summary',
        'description',
        'price',
        'quantity',
        'category',
        'updatedAt',
        'createdAt',
      ]);

      return AppResponse.Ok(
        sanitizedData,
        `Product has been updated successfully`,
      );
    } catch (e) {
      console.error(
        `Error in updateProduct: Unable to update product`,
        e.message,
        e.stack,
      );
      throw e;
    }
  }

  async deleteProduct(productId: string, userId: string) {
    try {
      const productExist =
        await this._productRepository.findProductById(productId);

      if (!productExist) {
        throw new NotFoundException(
          AppResponse.Error(
            `Product with ID: #${productId} not found, check input and try again`,
            ErrorMessage.NOT_FOUND,
          ),
        );
      }

      if (productExist.ownerId !== userId) {
        throw new UnauthorizedException(
          AppResponse.Error(
            `You are not authorized to make this change`,
            ErrorMessage.UNAUTHORIZED,
          ),
        );
      }

      const deleteProduct =
        await this._productRepository.discardProduct(productId);

      const sanitizedData = _.pick(deleteProduct, [
        'id',
        'name',
        'summary',
        'description',
        'price',
        'quantity',
        'category',
        'updatedAt',
        'createdAt',
      ]);

      return AppResponse.Ok(sanitizedData, `Product deleted successfully`);
    } catch (e) {
      console.error(
        `Error in deleteProduct: Unable to delete product`,
        e.message,
        e.stack,
      );
      throw e;
    }
  }

  async updateProductStatus(
    payload: updateProductStatusPayload,
    productId: string,
    userId: string,
  ) {
    try {
      const productExist =
        await this._productRepository.findProductById(productId);

      if (!productExist) {
        throw new NotFoundException(
          AppResponse.Error(
            `Product with ID: #${productId} not found, check input and try again`,
            ErrorMessage.NOT_FOUND,
          ),
        );
      }

      await this._productRepository.modifyProductApproval(
        payload,
        productId,
        userId,
      );

      return AppResponse.Ok(
        null,
        `Product status has been updated successfully`,
      );
    } catch (e) {
      console.error(
        `Error in updateProductApprovalStatus: Unable to update product status`,
        e.message,
        e.stack,
      );
      throw e;
    }
  }
}
