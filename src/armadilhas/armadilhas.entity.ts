import { Talhao } from 'src/talhoes/talhoes.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('armadilhas') // Define o nome da tabela no banco de dados
export class Armadilha {
  @PrimaryGeneratedColumn()
  id_armadilha: number;

  @Column({ type: 'varchar', length: 255 })
  tipo_coordenada: string;

  @Column({ type: 'text' })
  coordenadas: string;

  @Column()
  id_talhao: number;

  @ManyToOne(() => Talhao, (talhao) => talhao.armadilhas) // Assume uma relação de muitos para um com Talhão
  @JoinColumn({ name: 'id_talhao' }) // Coluna de junção para a chave estrangeira
  talhao: Talhao;
}
