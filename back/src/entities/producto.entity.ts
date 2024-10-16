import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column()
  descripcion: string; // Descripción del producto

  @Column({ nullable: true }) // Campo opcional para la URL de la imagen
  imageUrl?: string;

  @OneToMany(() => DetallePedido, detalle => detalle.producto) // Actualización de la relación con DetallePedido
  detalles: DetallePedido[];
}
