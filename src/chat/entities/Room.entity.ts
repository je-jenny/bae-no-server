import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntity } from '../../common'
import { ParticipateIn, Message } from '.'

export enum DealStatus {
  OPENED = 'opened',
  CLOSED = 'closed',
  // TODO: 생성자에 의해 파기된 방 구분 필요?
}

@Entity('rooms', { schema: 'public' })
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number

  @Column('character varying', { name: 'title', length: 64 })
  title!: string

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 64,
    default: () => 'NULL::character varying',
  })
  description?: string | null

  @Column('character varying', { name: 'food_category', length: 32 })
  foodCategory!: string

  @Column('character varying', { name: 'restaurant_name', length: 32 })
  restaurantName!: string

  @Column('smallint', { name: 'min_user', default: 2 })
  minUser!: number

  @Column('smallint', { name: 'max_user', default: 10 })
  maxUser!: number

  @Column('integer', { name: 'delivery_fee' })
  deliveryFee!: number

  @Column({
    type: 'enum',
    name: 'status',
    enum: DealStatus,
    default: DealStatus.OPENED,
  })
  status!: DealStatus

  @OneToMany(() => Message, (messages) => messages.room)
  messages?: Message[]

  @OneToMany(() => ParticipateIn, (participateIn) => participateIn.room, {
    cascade: true,
  })
  participateIn?: ParticipateIn[]
}
