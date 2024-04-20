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

/**
 * A entidade Talhao representa uma subdivisão de uma fazenda, conhecida como talhão, no sistema.
 *
 * - `id_talhao`: Chave primária da entidade e identificador único de cada talhão.
 * - `nome_talhao`: Nome do talhão, limitado a 100 caracteres.
 * - `tipo_coordenadas`: Descrição do tipo de coordenadas geográficas usadas, pode ser nulo e limitado a 45 caracteres.
 * - `fazenda`: Relacionamento muitos-para-um com a entidade Fazenda, vinculando o talhão à sua fazenda correspondente.
 * - `armadilhas`: Conjunto de armadilhas associadas a este talhão, representadas pela relação um-para-muitos com a entidade Armadilha.
 * - `coordenadas`: Conjunto de coordenadas geográficas associadas a este talhão, representadas pela relação um-para-muitos com a entidade TalhoesCoordenadas.
 */
@Entity('talhoes') // O nome da tabela no banco de dados
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
