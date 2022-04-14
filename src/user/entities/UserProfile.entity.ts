import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from '../../common'

// eslint-disable-next-line no-shadow
export enum ProfileProvider {
  GOOGLE = 'google',
  APPLE = 'apple',
  KAKAO = 'kakao',
  NAVER = 'naver',
  ETC = 'etc',
}

@Entity({ name: 'user_profiles' })
export class UserProfile extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 12 })
  nickname!: string

  @Column({ type: 'enum', enum: ProfileProvider, default: ProfileProvider.ETC })
  provider!: ProfileProvider

  @Column({ default: 0 })
  save_money!: number
}
