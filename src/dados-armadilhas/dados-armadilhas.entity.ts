import { Armadilha } from 'src/armadilhas/armadilhas.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * A entidade DadosArmadilhas armazena as informações coletadas por uma armadilha específica no sistema.
 *
 * Campos:
 * - `id_dados_armadilha`: Chave primária e identificador único para cada conjunto de dados coletados.
 * - `data_coleta`: Data e hora em que os dados foram coletados, armazenada como timestamp.
 * - `tipo_praga`: Tipo da praga detectada pela armadilha, armazenado como texto.
 * - `quantidade`: Quantidade de pragas detectadas durante a coleta.
 * - `armadilha`: Relacionamento muitos-para-um com a entidade Armadilha, vinculando os dados coletados à armadilha correspondente.
 *
 * A relação com a entidade Armadilha é estabelecida através da chave estrangeira `id_armadilha`, permitindo rastrear a origem dos dados.
 */
@Entity('dados_armadilhas') // Define o nome da tabela no banco de dados
export class DadosArmadilhas {
  @PrimaryGeneratedColumn()
  id_dados_armadilha: number;

  @CreateDateColumn({ type: 'timestamp' })
  data_coleta: Date;

  @Column('varchar', { length: 255 })
  tipo_praga: string;

  @Column('int')
  quantidade: number;

  @ManyToOne(() => Armadilha, (armadilha) => armadilha.dadosArmadilhas) // Relacionamento de muitos para um com Armadilha
  @JoinColumn({ name: 'id_armadilha' }) // Coluna de junção para a chave estrangeira
  armadilha: Armadilha;
}
