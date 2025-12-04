import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { jwtAuthGuard } from 'src/users/jwt-auth-guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(jwtAuthGuard)
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req
  ) {
    // Ajoute le userId à ton DTO
    createOrderDto.userId = req.user.id;

    const order = await this.ordersService.create(createOrderDto);
    return { message: 'Order created', order };
  }



  @Get('/all')
  async findAll() {
    const orders = await this.ordersService.findAll();
    return { orders };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const order = await this.ordersService.findOne(id);
    return { order };
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ) {
    const updated = await this.ordersService.updateStatus(id, status as any);
    return { message: 'Status updated', order: updated };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.ordersService.remove(id);
    return { message: 'Order deleted' };
  }
}
