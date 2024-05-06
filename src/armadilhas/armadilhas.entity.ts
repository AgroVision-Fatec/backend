import { DadosArmadilhas } from 'src/dados-armadilhas/dados-armadilhas.entity';
import { Talhao } from 'src/talhoes/talhoes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

/**
 * A entidade Armadilha representa uma armadilha física no sistema, que pode ser localizada em um talhão.
 *
 * Campos:
 * - `id_armadilha`: Chave primária e identificador único de cada armadilha.
 * - `tipo_coordenada`: Descreve o tipo de coordenada usada para localizar a armadilha, armazenado como texto.
 * - `latitude`: A latitude da localização da armadilha, armazenada como float.
 * - `longitude`: A longitude da localização da armadilha, armazenada como float.
 * - `talhao`: Relacionamento muitos-para-um com a entidade Talhao, indicando o talhão onde a armadilha está instalada.
 * - `dadosArmadilhas`: Relacionamento um-para-muitos com a entidade DadosArmadilhas, contendo os dados coletados por esta armadilha.
 *
 * Esta configuração permite a associação de dados geográficos precisos à armadilha e facilita a agregação de dados coletados.
 */
@Entity('armadilhas') // Define o nome da tabela no banco de dados
export class Armadilha {
  @PrimaryGeneratedColumn()
  id_armadilha: number;

  @Column('varchar', { length: 255 })
  tipo_coordenada: string;

  @Column('float') // Usando float para latitude
  latitude: number;

  @Column('float') // Usando float para longitude
  longitude: number;

  @ManyToOne(() => Talhao, (talhao) => talhao.armadilhas) // Relacionamento de muitos para um com Talhão
  @JoinColumn({ name: 'id_talhao' }) // Coluna de junção para a chave estrangeira
  talhao: Talhao;

  @OneToMany(
    () => DadosArmadilhas,
    (dadosArmadilhas) => dadosArmadilhas.armadilha,
  )
  dadosArmadilhas: DadosArmadilhas[];
}
