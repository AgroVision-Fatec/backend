import { Talhao } from 'src/talhoes/talhoes.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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

  @OneToMany(() => Talhao, (talhao) => talhao.fazenda)
  talhoes: Talhao[];
}
