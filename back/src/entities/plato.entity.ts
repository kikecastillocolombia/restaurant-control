import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';

@Entity()
export class Plato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column()
  descripcion: string; // Descripción del plato

  @OneToMany(() => DetallePedido, detalle => detalle.plato) // Relación con DetallePedido
  detalles: DetallePedido[];
}
