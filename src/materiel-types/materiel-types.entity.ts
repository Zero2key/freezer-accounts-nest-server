import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class MaterielType {
  @PrimaryColumn({ length: 16 })
  code: string;

  @Column({ length: 16 })
  label: string;
}
