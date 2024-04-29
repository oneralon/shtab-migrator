import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Anomaly {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public title: string;

  @Column({
    type: 'timestamp',
    default: 'now()',
    nullable: false,
  })
  public createdAt: Date;
}
