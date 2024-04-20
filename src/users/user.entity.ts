import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Fazenda } from 'src/fazendas/fazenda.entity'; // Certifique-se de importar a entidade corretamente

/**
 * A entidade User representa um usuário no sistema.
 *
 * - `id_usuario`: É a chave primária da entidade.
 * - `nome`: Nome do usuário, limitado a 45 caracteres.
 * - `telefone`: Telefone do usuário, armazenado como string para preservar formatação e caracteres especiais.
 * - `email`: E-mail do usuário, limitado a 45 caracteres.
 * - `password`: Senha do usuário, armazenada como hash e limitada a 255 caracteres.
 *
 * Um usuário pode estar associado a várias fazendas, representado pela relação OneToMany com a entidade Fazenda.
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column('varchar', { length: 45 })
  nome: string;

  @Column('varchar', { length: 15 }) // Aumentado para 15 para acomodar números internacionais
  telefone: string;

  @Column('varchar', { length: 45 })
  email: string;

  @Column('varchar', { length: 255 })
  password: string;

  @OneToMany(() => Fazenda, (fazenda) => fazenda.usuario)
  fazendas: Fazenda[];
}
