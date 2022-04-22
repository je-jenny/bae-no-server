import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { BaseEntity } from '../../common'

@Entity({ name: 'verifications' })
@Unique(['phone_number', 'code'])
export class Verification extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ length: 12, nullable: false })
  phone_number!: string

  @Column({ length: 6, nullable: false })
  code!: string
}
