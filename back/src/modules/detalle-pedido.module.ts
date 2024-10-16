import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { DetallePedidoService } from '../services/detalle-pedido.service';
import { DetallePedidoController } from '../controllers/detalle-pedido.controller';
import { Pedido } from 'src/entities/pedido.entity';
import { Producto } from 'src/entities/producto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetallePedido, Pedido, Producto])],
  controllers: [DetallePedidoController],
  providers: [DetallePedidoService],
})
export class DetallePedidoModule {}
