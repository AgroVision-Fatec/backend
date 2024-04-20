import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Armadilha } from 'src/armadilhas/armadilhas.entity';

/**
 * A entidade Imagem armazena informações sobre imagens capturadas pelas armadilhas.
 *
 * Campos:
 * - `id`: Identificador único para cada imagem (chave primária).
 * - `nomeOriginal`: O nome original do arquivo de imagem conforme enviado pelo usuário.
 * - `nomeSalvo`: O nome do arquivo após ser processado e salvo no servidor. Isso pode incluir um prefixo ou sufixo para evitar colisões de nomes.
 * - `dtCriado`: A data e hora quando a imagem foi criada e armazenada no sistema. Gerado automaticamente.
 * - `flAtivo`: Flag indicando se a imagem está ativa para uso no sistema. Pode ser usada para desativar o acesso sem deletar o registro.
 * - `armadilha`: A armadilha à qual esta imagem está associada, permitindo uma relação de muitas imagens para uma armadilha.
 *
 * Relacionamentos:
 * - Cada imagem está ligada a uma única armadilha, mas uma armadilha pode ter várias imagens associadas a ela.
 */
@Entity('imagens')
export class Imagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeOriginal: string;

  @Column()
  nomeSalvo: string;

  @CreateDateColumn()
  dtCriado: Date;

  @Column()
  flAtivo: boolean;

  @Column()
  idArmadilha: number;

  @ManyToOne(() => Armadilha, (armadilha) => armadilha.dadosArmadilhas)
  @JoinColumn({ name: 'idArmadilha' })
  armadilha: Armadilha;
}
