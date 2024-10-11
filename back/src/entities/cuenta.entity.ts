import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Pedido } from './pedido.entity';

@Entity()
export class Cuenta {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Pedido, pedido => pedido.cuenta)
  @JoinColumn()
  pedido: Pedido; // Relación con Pedido

  @Column('decimal')
  total: number;

  @Column({ default: false })
  pagado: boolean; // Si la cuenta está pagada o no
}
