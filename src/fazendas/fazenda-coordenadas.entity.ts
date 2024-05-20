import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Fazenda } from 'src/fazendas/fazenda.entity'; // Assegure-se de que o caminho para a importação está correto

/**
 * A entidade FazendaCoordenadas armazena as coordenadas geográficas de uma fazenda.
 *
 * Campos:
 * - `id_coordenada`: Identificador único para cada coordenada (chave primária).
 * - `longitude`: Longitude da localização da fazenda.
 * - `latitude`: Latitude da localização da fazenda.
 * - `fazenda`: Relacionamento com a entidade Fazenda, indicando a qual fazenda
 *   estas coordenadas pertencem.
 *
 * A relação ManyToOne com Fazenda permite associar múltiplas coordenadas a uma única fazenda.
 */
@Entity()
export class FazendaCoordenadas {
  @PrimaryGeneratedColumn()
  id_coordenada: number;

  @Column('float')
  longitude: number;

  @Column('float')
  latitude: number;

  @ManyToOne(() => Fazenda, (fazenda) => fazenda.coordenadas)
  @JoinColumn({ name: 'id_fazenda' }) // Esta coluna deve corresponder à FK na tabela Fazenda
  fazenda: Fazenda;
}
