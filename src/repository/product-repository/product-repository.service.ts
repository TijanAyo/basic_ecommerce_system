import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AppResponse, ErrorMessage } from '../../common/helpers';
import {
  createProductPayload,
  updateProductPayload,
} from '../../common/interfaces';

@Injectable()
export class ProductRepositoryService {
  constructor(private readonly _prismaService: PrismaService) {}
  async findProductById(productId: string) {
    try {
      return await this._prismaService.product.findUnique({
        where: { id: productId },
      });
    } catch (e) {
      console.error(
        `Error in findProductById: Unable to find product`,
        e.message,
        e.stack,
      );
      throw new InternalServerErrorException(
        AppResponse.Error(
          `An unexpected error has occurred`,
          ErrorMessage.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  async viewProducts(page: string, pageSize: string) {
    try {
      const currentPage = Number.parseInt(page, 10);
      const size = Number.parseInt(pageSize, 10);
      const skip = (currentPage - 1) * size;

      const products = await this._prismaService.product.findMany({
        skip,
        take: size,
      });

      const totalUsers = await this._prismaService.product.count({
        where: { status: 'PendingApproval' },
      });
      const totalPages = Math.ceil(totalUsers / size);

      return { products, totalUsers, totalPages, currentPage };
    } catch (e) {
      console.error(
        `Error in veiwProducts: Unable to fetch products`,
        e.message,
        e.stack,
      );
      throw new InternalServerErrorException(
        AppResponse.Error(
          `An unexpected error has occurred`,
          ErrorMessage.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  async addNewProduct(payload: createProductPayload, userId: string) {
    try {
      const newProduct = await this._prismaService.product.create({
        data: {
          name: payload.name,
          summary: payload.summary ?? undefined,
          description: payload.description ?? undefined,
          quantity: payload.quantity,
          price: payload.price.toFixed(2),
          category: payload.category ?? undefined,
          ownerId: userId,
        },
      });

      return newProduct;
    } catch (e) {
      console.error(
        `Error in addNewProduct: Unable to create product`,
        e.message,
        e.stack,
      );
      throw new InternalServerErrorException(
        AppResponse.Error(
          `An unexpected error has occurred`,
          ErrorMessage.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  async modifyProduct(payload: updateProductPayload, productId: string) {
    try {
      const product = await this._prismaService.product.update({
        where: { id: productId },
        data: {
          name: payload.name,
          summary: payload.summary,
          description: payload.description,
          quantity: payload.quantity,
          price: payload.price,
          category: payload.category,
        },
      });

      return product;
    } catch (e) {
      console.error(
        `Error in modifyProduct: Unable to modify product`,
        e.message,
        e.stack,
      );
      throw new InternalServerErrorException(
        AppResponse.Error(
          `An unexpected error has occurred`,
          ErrorMessage.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }

  async discardProduct(productId: string) {
    try {
      const product = await this._prismaService.product.delete({
        where: { id: productId },
      });
      return product;
    } catch (e) {
      console.error(
        `Error in discardProduct: Unable to discard product`,
        e.message,
        e.stack,
      );
      throw new InternalServerErrorException(
        AppResponse.Error(
          `An unexpected error has occurred`,
          ErrorMessage.INTERNAL_SERVER_ERROR,
        ),
      );
    }
  }
}
