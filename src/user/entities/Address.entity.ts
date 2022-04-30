import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { User } from '.'
import { BaseEntity } from '../../common'

@Entity({ name: 'address' })
export class Address extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  place!: string

  @Column({ type: 'double precision' })
  latitude!: number

  @Column({ type: 'double precision' })
  longitude!: number

  @Column()
  userId!: number

  @ManyToOne(() => User, (user) => user.address, {
    onDelete: 'CASCADE',
  })
  user!: User
}
