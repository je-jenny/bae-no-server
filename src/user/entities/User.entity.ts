import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm'
import { UserProfile } from '.'
import { BaseEntity } from '../../common'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 50, nullable: false, unique: true })
  email!: string

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  profile!: UserProfile
}
