import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm'
import { UserProfile, Address } from '.'
import { BaseEntity } from '../../common'
import { ParticipateIn, Message } from '../../chat/entities'

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 50, nullable: false, unique: true })
  email!: string

  @Column({ nullable: true })
  defaultAddressId?: number

  @OneToOne(() => UserProfile, (profile) => profile.user, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  profile!: UserProfile

  @OneToMany(() => Address, (address) => address.user, {
    cascade: ['soft-remove'],
  })
  address?: Address[]

  @OneToMany(() => Message, (messages) => messages.user)
  messages?: Promise<Message[]>

  @OneToMany(() => ParticipateIn, (participateIn) => participateIn.user)
  participateIn?: ParticipateIn[]
}
