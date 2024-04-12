import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fazenda {
  @PrimaryGeneratedColumn()
  id_fazenda: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 45 })
  tipoCoordenada: string;

  @Column('text')
  coordenadas: string;
}
