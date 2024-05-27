import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Fazenda } from 'src/fazendas/fazenda.entity'; // Certifique-se de que a importação está correta
import { Armadilha } from 'src/armadilhas/armadilhas.entity'; // Certifique-se de que a importação está correta
import { TalhoesCoordenadas } from 'src/talhoes-coordenadas/talhoes-coordenadas.entity'; // Certifique-se de que a importação está correta


@Entity('talhoes') 
export class Talhao {
  @PrimaryGeneratedColumn()
  id_talhao: number;

  @Column('varchar', { length: 100 })
  nome_talhao: string;

  @Column('varchar', { length: 45, nullable: true })
  tipo_coordenadas: string;

  @ManyToOne(() => Fazenda, (fazenda) => fazenda.talhoes)
  @JoinColumn({ name: 'id_fazenda' }) // Coluna que estabelece a relação
  fazenda: Fazenda;

  @OneToMany(() => Armadilha, (armadilha) => armadilha.talhao)
  armadilhas: Armadilha[];

  @OneToMany(
    () => TalhoesCoordenadas,
    (talhoesCoordenadas) => talhoesCoordenadas.talhao,
  )
  coordenadas: TalhoesCoordenadas[];
}
