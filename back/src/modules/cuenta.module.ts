import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cuenta } from '../entities/cuenta.entity';
import { CuentaService } from '../services/cuenta.service';
import { CuentaController } from '../controllers/cuenta.controller';
import { PedidoModule } from './pedido.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cuenta]),
  PedidoModule
],
  controllers: [CuentaController],
  providers: [CuentaService],
})
export class CuentaModule {}
