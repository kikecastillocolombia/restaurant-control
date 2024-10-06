import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  rol: string; // 'mesero' o 'administrador'

  @OneToMany(() => Pedido, pedido => pedido.usuario)
  pedidos: Pedido[];
}
