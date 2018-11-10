import { Entity, Column, PrimaryColumn } from 'typeorm';

/**
 * 物料
 */
@Entity()
export class MaterielType {
  /**
   * 物料code
   * @type {string}
   * @memberof MaterielType
   */
  @PrimaryColumn({ length: 16 })
  code: string;

  /**
   * 物料label
   * @type {string}
   * @memberof MaterielType
   */
  @Column({ length: 16 })
  label: string;
}
