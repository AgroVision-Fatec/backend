import { Armadilha } from 'src/armadilhas/armadilhas.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('dados_armadilhas') // Define o nome da tabela no banco de dados
export class DadosArmadilhas {
  @PrimaryGeneratedColumn()
  id_dados_armadilha: number;

  @CreateDateColumn({ type: 'timestamp' })
  data_coleta: Date;

  @Column({ type: 'varchar', length: 255 })
  tipo_praga: string;

  @Column({ type: 'int' })
  quantidade: number;

  @Column()
  id_armadilha: number;

  @ManyToOne(() => Armadilha, (armadilha) => armadilha.dadosArmadilhas) // Assume uma relação de muitos para um com Armadilha
  @JoinColumn({ name: 'id_armadilha' }) // Coluna de junção para a chave estrangeira
  armadilha: Armadilha;
}
