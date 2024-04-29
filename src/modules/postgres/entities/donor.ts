import { Email, Name } from 'src/core';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Donor {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public name: Name;

  @Index()
  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  public email: Email;

  @Column({
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  public createdAt: Date;
}
