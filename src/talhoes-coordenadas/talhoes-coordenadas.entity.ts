import { Talhao } from 'src/talhoes/talhoes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

/**
 * A entidade TalhoesCoordenadas armazena as coordenadas geográficas para um talhão.
 *
 * - `id_coordenada`: Identificador único para cada coordenada (chave primária).
 * - `longitude`: Longitude da localização do talhão.
 * - `latitude`: Latitude da localização do talhão.
 * - `talhao`: Relacionamento muitos-para-um com a entidade Talhao, indicando o talhão ao qual as coordenadas pertencem.
 *
 * O relacionamento com Talhao é estabelecido através da chave estrangeira `id_talhao`.
 */
@Entity('talhoes_coordenadas') // O nome da tabela no banco de dados
export class TalhoesCoordenadas {
  @PrimaryGeneratedColumn()
  id_coordenada: number;

  @Column('float')
  longitude: number;

  @Column('float')
  latitude: number;

  @ManyToOne(() => Talhao, (talhao) => talhao.coordenadas)
  @JoinColumn({ name: 'id_talhao' })
  talhao: Talhao;
}
