import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { BaseEntity } from '../../common'
import { Message } from '.'
import { User } from '../../user/entities'

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id!: number

  @Column("character varying", { name: "title", length: 64 })
  title!: string

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 64,
    default: () => "NULL::character varying",
  })
  description?: string | null

  @Column("character varying", { name: "food_category", length: 32 })
  foodCategory!: string

  @Column("smallint", { name: "max_user" })
  maxUser!: number

  @Column("integer", { name: "delivery_fee" })
  deliveryFee!: number

  @OneToMany(() => Message, (messages) => messages.room)
  messages?: Message[]

  @ManyToMany(() => User)
  @JoinTable({
    name: "participate_in",
    joinColumn: {
      name: "room_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "user_id",
      referencedColumnName: "id"
    }
  })
  users?: Promise<User[]>;

  // @OneToMany(() => ParticipateIn, (participateIn) => participateIn.roomId)
  // participateIn?: ParticipateIn[]
}
