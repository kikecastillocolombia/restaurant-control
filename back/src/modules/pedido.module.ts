import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from '../entities/pedido.entity';
import { PedidoService } from '../services/pedido.service';
import { PedidoController } from '../controllers/pedido.controller';
import { DetallePedido } from '../entities/detalle-pedido.entity';
import { UsuarioModule } from './usuario.module';
import { MesaModule } from './mesa.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, DetallePedido]),
UsuarioModule,
MesaModule],
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
