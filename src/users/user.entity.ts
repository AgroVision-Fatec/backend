import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 45 })
  nome: string;

  @Column({ length: 45 })
  email: string;

  @Column({ length: 255 })
  password: string;
}
