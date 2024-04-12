import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Fazenda } from 'src/fazendas/fazenda.entity'; // Assumindo que você tem uma entidade Fazenda
import { Armadilha } from 'src/armadilhas/armadilhas.entity';

@Entity('talhoes') // O nome da tabela no banco de dados
export class Talhao {
  @PrimaryGeneratedColumn()
  id_talhao: number;

  @Column({ length: 100 })
  nome_talhao: string;

  @Column({ length: 45, nullable: true })
  tipo_coordenada: string;

  @Column({ type: 'text', nullable: true })
  coordenadas: string;

  @Column()
  id_fazenda: number;

  @ManyToOne(() => Fazenda, (fazenda) => fazenda.talhoes)
  @JoinColumn({ name: 'id_fazenda' }) // Coluna que estabelece a relação
  fazenda: Fazenda;

  @OneToMany(() => Armadilha, (armadilha) => armadilha.talhao)
  armadilhas: Armadilha[];
}
