import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Talhao } from 'src/talhoes/talhoes.entity'; // Importe a entidade Talhao corretamente
import { User } from 'src/users/user.entity'; // Importe a entidade User corretamente
import { FazendaCoordenadas } from 'src/fazendas-coordenadas/fazenda-coordenadas.entity'; // Importe a entidade FazendaCoordenadas corretamente

/**
 * A entidade Fazenda representa uma fazenda no sistema.
 *
 * Campos:
 * - `id_fazenda`: É a chave primária da entidade.
 * - `nome_fazenda`: O nome da fazenda, pode ter até 100 caracteres.
 * - `tipo_coordenadas`: O tipo do sistema de coordenadas usado para a fazenda, limitado a 45 caracteres.
 * - `usuario`: Relacionamento muitos-para-um com a entidade User, representando o usuário proprietário da fazenda.
 * - `talhoes`: Relacionamento um-para-muitos com a entidade Talhao, representando os talhões pertencentes à fazenda.
 * - `coordenadas`: Relacionamento um-para-muitos com a entidade FazendaCoordenadas, representando as coordenadas geográficas da fazenda.
 */
@Entity()
export class Fazenda {
  @PrimaryGeneratedColumn()
  id_fazenda: number;

  @Column('varchar', { length: 100 })
  nome_fazenda: string;

  @Column('varchar', { length: 45 })
  tipo_coordenadas: string;

  @OneToMany(() => Talhao, (talhao) => talhao.fazenda)
  talhoes: Talhao[];

  @ManyToOne(() => User, (user) => user.fazendas)
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;

  @OneToMany(
    () => FazendaCoordenadas,
    (fazendaCoordenada) => fazendaCoordenada.fazenda,
  )
  coordenadas: FazendaCoordenadas[];
}
