import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plato } from '../entities/plato.entity';
import { PlatoService } from '../services/plato.service';
import { PlatoController } from '../controllers/plato.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plato])],
  controllers: [PlatoController],
  providers: [PlatoService],
})
export class PlatoModule {}
