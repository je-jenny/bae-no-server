import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { BaseEntity } from '../../common'
import { User } from './User.entity'

export const PROFILE_PROVIDER = {
  GOOGLE: 'google',
  APPLE: 'apple',
  KAKAO: 'kakao',
  NAVER: 'naver',
  ETC: 'etc',
} as const

export const PROFILE_PROFILE_ARRAY = Object.values(PROFILE_PROVIDER)
export type ProfileProvider = typeof PROFILE_PROFILE_ARRAY[number]

@Entity({ name: 'user_profiles' })
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 12, nullable: true, unique: true })
  nickname?: string

  @Column({
    type: 'enum',
    enum: PROFILE_PROFILE_ARRAY,
    default: PROFILE_PROVIDER.ETC,
  })
  provider!: ProfileProvider

  @Column({ length: 12, nullable: true, unique: true })
  phone_number?: string

  @Column({ default: 0 })
  save_money!: number

  @Column({ nullable: true })
  latitude?: number

  @Column({ nullable: true })
  longitude?: number

  @Column()
  userId!: number

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    orphanedRowAction: 'soft-delete',
  })
  @JoinColumn()
  user!: User
}
