import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { UserProfile } from '.'
import { BaseEntity } from '../../common'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 50 })
  email!: string

  @OneToOne(() => UserProfile)
  profile!: UserProfile
}
