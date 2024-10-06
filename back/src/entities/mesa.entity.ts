import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class Mesa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numero: number;

  @OneToMany(() => Pedido, pedido => pedido.mesa)
  pedidos: Pedido[];
}
