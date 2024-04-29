import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sync {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public log: string;

  @Column({
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  public createdAt: Date;
}
