import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/Product.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  /** 📌 Récupérer tous les produits */
  async getAllProduct() {
    return this.prisma.product.findMany();
  }

  /** 📌 Récupérer un produit par ID */
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

/** 📌 Créer un produit */
async create(data: CreateProductDto) {
  // Vérifier si le produit existe déjà
  const exists = await this.prisma.product.findUnique({
    where: { name: data.name },
  });

  if (exists) {
    throw new BadRequestException('Product already exists');
  }

  const product = await this.prisma.product.create({
    data: {
      name: data.name,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      stock: data.stock ?? 0, 
    },
  });

  return product; 
}


  /** 📌 Créer plusieurs produits (bulk) */
  async createBulk(products: CreateProductDto[]) {
    const created: any[] = [];

    for (const product of products) {
      try {
        const newProduct = await this.create(product);
        created.push(newProduct);
      } catch (err) {
        // Passer les doublons
        console.log(`Produit déjà existant : ${product.name}`);
      }
    }

    return created;
  }

  /** 📌 Mettre à jour un produit */
  async update(id: number, data: UpdateProductDto) {
    // Vérifier si le produit existe
    await this.findOne(id);

    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  /** 📌 Supprimer un produit */
  async delete(id: number) {
    // Vérifier si le produit existe
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
