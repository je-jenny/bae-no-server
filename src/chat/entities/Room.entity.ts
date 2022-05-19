import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { BaseEntity } from "../../common"
import { ParticipateIn, Message } from "."

@Index("rooms_pkey", ["id"], { unique: true })
@Entity("rooms", { schema: "public" })
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

  @OneToMany(() => ParticipateIn, (participateIn) => participateIn.roomId)
  participateIn?: ParticipateIn[]
}
